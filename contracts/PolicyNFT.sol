// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract PolicyNFT is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");
    
    uint256 private _tokenIdCounter;
    
    // URI storage mapping
    mapping(uint256 => string) private _tokenURIs;
    
    struct PolicyMetadata {
        uint256 policyId;
        string coverageType;
        uint256 coverageAmount;
        uint256 premium;
        uint256 startDate;
        uint256 endDate;
        string beneficiaries;
        string holderName;
        string holderPhone;
        bool active;
        uint256 claimsCount;
        uint256 totalClaimed;
    }
    
    mapping(uint256 => PolicyMetadata) public policyMetadata;
    mapping(address => uint256[]) public userTokens;
    
    event PolicyNFTMinted(uint256 indexed tokenId, uint256 indexed policyId, address indexed holder);
    event PolicyNFTUpdated(uint256 indexed tokenId, string metadata);
    event PolicyNFTTransferred(uint256 indexed tokenId, address indexed from, address indexed to);
    
    constructor() ERC721("MicroSeguro Policy", "MSP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPDATER_ROLE, msg.sender);
    }
    
    function mintPolicyNFT(
        address _to,
        uint256 _policyId,
        PolicyMetadata memory _metadata,
        string memory _tokenURI
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        policyMetadata[tokenId] = _metadata;
        userTokens[_to].push(tokenId);
        
        emit PolicyNFTMinted(tokenId, _policyId, _to);
        return tokenId;
    }
    
    function updatePolicyMetadata(
        uint256 _tokenId,
        PolicyMetadata memory _metadata,
        string memory _tokenURI
    ) external onlyRole(UPDATER_ROLE) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        
        policyMetadata[_tokenId] = _metadata;
        _setTokenURI(_tokenId, _tokenURI);
        
        emit PolicyNFTUpdated(_tokenId, _tokenURI);
    }
    
    function getUserTokens(address _user) external view returns (uint256[] memory) {
        return userTokens[_user];
    }
    
    function getPolicyMetadata(uint256 _tokenId) external view returns (PolicyMetadata memory) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        return policyMetadata[_tokenId];
    }
    
    function getActivePolicies(address _user) external view returns (uint256[] memory) {
        uint256[] memory allTokens = userTokens[_user];
        uint256[] memory activeTokens = new uint256[](allTokens.length);
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < allTokens.length; i++) {
            if (policyMetadata[allTokens[i]].active && 
                block.timestamp < policyMetadata[allTokens[i]].endDate) {
                activeTokens[activeCount] = allTokens[i];
                activeCount++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](activeCount);
        for (uint256 i = 0; i < activeCount; i++) {
            result[i] = activeTokens[i];
        }
        
        return result;
    }
    
    function calculateUserStats(address _user) external view returns (
        uint256 totalPolicies,
        uint256 activePolicies,
        uint256 totalCoverage,
        uint256 totalPremiums,
        uint256 totalClaims
    ) {
        uint256[] memory tokens = userTokens[_user];
        
        for (uint256 i = 0; i < tokens.length; i++) {
            PolicyMetadata memory metadata = policyMetadata[tokens[i]];
            totalPolicies++;
            totalPremiums += metadata.premium;
            totalClaims += metadata.totalClaimed;
            
            if (metadata.active && block.timestamp < metadata.endDate) {
                activePolicies++;
                totalCoverage += metadata.coverageAmount - metadata.totalClaimed;
            }
        }
    }
    
    function _removeFromUserTokens(address _user, uint256 _tokenId) internal {
        uint256[] storage tokens = userTokens[_user];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == _tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }
    

    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        
        // Update user tokens mapping
        _removeFromUserTokens(from, tokenId);
        userTokens[to].push(tokenId);
        
        emit PolicyNFTTransferred(tokenId, from, to);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

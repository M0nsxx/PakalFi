// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PolicyNFT is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    
    uint256 private _tokenIdCounter;
    
    // URI storage mapping
    mapping(uint256 => string) private _tokenURIs;
    
    enum Region {
        LATAM,
        AFRICA,
        SOUTHEAST_ASIA,
        GLOBAL
    }
    
    enum InsuranceType {
        HEALTH,
        CLIMATE,
        SECURITY,
        MOBILITY
    }
    
    struct PolicyMetadata {
        uint256 policyId;
        InsuranceType coverageType;
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
        Region region;
        string currency; // USD, MXN, NGN, IDR, etc.
        uint256 chainId; // Multi-chain support
        string parametricTriggers; // JSON string for triggers
        bool gaslessPayment; // 0x Protocol integration
        bool savingsGoal; // Para Wallet integration
        uint256 sdgImpact; // UN SDG tracking
        string riskScore; // AI risk assessment
    }
    
    mapping(uint256 => PolicyMetadata) public policyMetadata;
    mapping(address => uint256[]) public userTokens;
    mapping(Region => uint256[]) public regionalPolicies;
    mapping(string => uint256[]) public currencyPolicies;
    
    // Events
    event PolicyNFTMinted(uint256 indexed tokenId, uint256 indexed policyId, address indexed holder, Region region, string currency);
    event PolicyNFTUpdated(uint256 indexed tokenId, string metadata);
    event PolicyNFTTransferred(uint256 indexed tokenId, address indexed from, address indexed to);
    event ParametricTriggerSet(uint256 indexed tokenId, string triggers);
    event GaslessPaymentEnabled(uint256 indexed tokenId, bool enabled);
    event SavingsGoalLinked(uint256 indexed tokenId, string goalId);
    event SDGImpactTracked(uint256 indexed tokenId, uint256 sdgGoal);
    
    constructor() ERC721("MicroInsurance Policy", "MIP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPDATER_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
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
        regionalPolicies[_metadata.region].push(tokenId);
        currencyPolicies[_metadata.currency].push(tokenId);
        
        emit PolicyNFTMinted(tokenId, _policyId, _to, _metadata.region, _metadata.currency);
        return tokenId;
    }
    
    function updatePolicyMetadata(
        uint256 _tokenId,
        PolicyMetadata memory _metadata,
        string memory _tokenURI
    ) external onlyRole(UPDATER_ROLE) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        
        PolicyMetadata storage existing = policyMetadata[_tokenId];
        
        // Update mappings if region or currency changed
        if (existing.region != _metadata.region) {
            _removeFromArray(regionalPolicies[existing.region], _tokenId);
            regionalPolicies[_metadata.region].push(_tokenId);
        }
        
        if (keccak256(bytes(existing.currency)) != keccak256(bytes(_metadata.currency))) {
            _removeFromArray(currencyPolicies[existing.currency], _tokenId);
            currencyPolicies[_metadata.currency].push(_tokenId);
        }
        
        policyMetadata[_tokenId] = _metadata;
        _setTokenURI(_tokenId, _tokenURI);
        
        emit PolicyNFTUpdated(_tokenId, _tokenURI);
    }
    
    function setParametricTriggers(
        uint256 _tokenId,
        string memory _triggers
    ) external onlyRole(ORACLE_ROLE) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        policyMetadata[_tokenId].parametricTriggers = _triggers;
        emit ParametricTriggerSet(_tokenId, _triggers);
    }
    
    function enableGaslessPayment(
        uint256 _tokenId,
        bool _enabled
    ) external onlyRole(UPDATER_ROLE) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        policyMetadata[_tokenId].gaslessPayment = _enabled;
        emit GaslessPaymentEnabled(_tokenId, _enabled);
    }
    
    function linkSavingsGoal(
        uint256 _tokenId,
        string memory _goalId
    ) external onlyRole(UPDATER_ROLE) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        policyMetadata[_tokenId].savingsGoal = true;
        emit SavingsGoalLinked(_tokenId, _goalId);
    }
    
    function trackSDGImpact(
        uint256 _tokenId,
        uint256 _sdgGoal
    ) external onlyRole(ORACLE_ROLE) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        policyMetadata[_tokenId].sdgImpact = _sdgGoal;
        emit SDGImpactTracked(_tokenId, _sdgGoal);
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
    
    function getRegionalPolicies(Region _region) external view returns (uint256[] memory) {
        return regionalPolicies[_region];
    }
    
    function getCurrencyPolicies(string memory _currency) external view returns (uint256[] memory) {
        return currencyPolicies[_currency];
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
    
    function getGlobalStats() external view returns (
        uint256 totalPolicies,
        uint256 activePolicies,
        uint256 totalCoverage,
        uint256 totalPremiums,
        uint256 totalClaims,
        uint256[] memory regionalCounts,
        uint256[] memory currencyCounts
    ) {
        regionalCounts = new uint256[](4); // 4 regions
        currencyCounts = new uint256[](10); // Support for 10 currencies
        
        for (uint256 i = 0; i < 4; i++) {
            regionalCounts[i] = regionalPolicies[Region(i)].length;
        }
        
        // Count by currency (simplified - in production would use a mapping)
        string[] memory currencies = new string[](10);
        currencies[0] = "USD";
        currencies[1] = "MXN";
        currencies[2] = "NGN";
        currencies[3] = "IDR";
        currencies[4] = "INR";
        currencies[5] = "BRL";
        currencies[6] = "ARS";
        currencies[7] = "COP";
        currencies[8] = "PEN";
        currencies[9] = "CLP";
        
        for (uint256 i = 0; i < 10; i++) {
            currencyCounts[i] = currencyPolicies[currencies[i]].length;
        }
        
        // Calculate totals
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (_ownerOf(i) != address(0)) {
                PolicyMetadata memory metadata = policyMetadata[i];
                totalPolicies++;
                totalPremiums += metadata.premium;
                totalClaims += metadata.totalClaimed;
                
                if (metadata.active && block.timestamp < metadata.endDate) {
                    activePolicies++;
                    totalCoverage += metadata.coverageAmount - metadata.totalClaimed;
                }
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
    
    function _removeFromArray(uint256[] storage _array, uint256 _value) internal {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _value) {
                _array[i] = _array[_array.length - 1];
                _array.pop();
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

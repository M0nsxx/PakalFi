// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract GaslessPaymentHandler is AccessControl, ReentrancyGuard, Pausable {
    using ECDSA for bytes32;

    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant PAYMENT_ROLE = keccak256("PAYMENT_ROLE");
    
    struct GaslessPayment {
        uint256 paymentId;
        address payer;
        address recipient;
        uint256 amount;
        string currency;
        uint256 chainId;
        uint256 timestamp;
        bool processed;
        bool failed;
        string reason;
        bytes signature;
        uint256 nonce;
    }
    
    struct SwapQuote {
        uint256 quoteId;
        string sellToken;
        string buyToken;
        uint256 sellAmount;
        uint256 buyAmount;
        uint256 slippagePercentage;
        uint256 expiry;
        bool executed;
    }
    
    struct InsuranceClaim {
        uint256 claimId;
        uint256 policyId;
        address beneficiary;
        uint256 amount;
        string preferredCurrency;
        bool gaslessPayout;
        bool processed;
        uint256 timestamp;
    }
    
    mapping(uint256 => GaslessPayment) public gaslessPayments;
    mapping(uint256 => SwapQuote) public swapQuotes;
    mapping(uint256 => InsuranceClaim) public insuranceClaims;
    mapping(address => uint256) public userNonces;
    mapping(bytes32 => bool) public processedHashes;
    
    uint256 private _paymentIdCounter;
    uint256 private _quoteIdCounter;
    uint256 private _claimIdCounter;
    
    uint256 public constant MAX_SLIPPAGE = 500; // 5%
    uint256 public constant PAYMENT_TIMEOUT = 1 hours;
    uint256 public constant QUOTE_EXPIRY = 5 minutes;
    
    event GaslessPaymentInitiated(uint256 indexed paymentId, address indexed payer, address indexed recipient, uint256 amount, string currency);
    event GaslessPaymentProcessed(uint256 indexed paymentId, bool success, string reason);
    event SwapQuoteCreated(uint256 indexed quoteId, string sellToken, string buyToken, uint256 sellAmount, uint256 buyAmount);
    event SwapQuoteExecuted(uint256 indexed quoteId, bool success);
    event InsuranceClaimFiled(uint256 indexed claimId, uint256 indexed policyId, address indexed beneficiary, uint256 amount);
    event InsuranceClaimProcessed(uint256 indexed claimId, bool success, string reason);
    event NonceUpdated(address indexed user, uint256 newNonce);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
        _grantRole(PAYMENT_ROLE, msg.sender);
    }
    
    function initiateGaslessPayment(
        address _recipient,
        uint256 _amount,
        string memory _currency,
        uint256 _chainId,
        bytes memory _signature
    ) external onlyRole(PAYMENT_ROLE) returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_recipient != address(0), "Invalid recipient");
        
        uint256 paymentId = _paymentIdCounter;
        _paymentIdCounter++;
        
        uint256 nonce = userNonces[_recipient]++;
        
        // Verify signature
        bytes32 messageHash = keccak256(abi.encodePacked(
            _recipient,
            _amount,
            _currency,
            _chainId,
            nonce,
            block.chainid
        ));
        
        // Extract signature components
        require(_signature.length == 65, "Invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
        
        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        address signer = ecrecover(ethSignedMessageHash, v, r, s);
        
        require(signer == _recipient, "Invalid signature");
        require(!processedHashes[messageHash], "Payment already processed");
        
        processedHashes[messageHash] = true;
        
        gaslessPayments[paymentId] = GaslessPayment({
            paymentId: paymentId,
            payer: signer,
            recipient: _recipient,
            amount: _amount,
            currency: _currency,
            chainId: _chainId,
            timestamp: block.timestamp,
            processed: false,
            failed: false,
            reason: "",
            signature: _signature,
            nonce: nonce
        });
        
        emit GaslessPaymentInitiated(paymentId, signer, _recipient, _amount, _currency);
        emit NonceUpdated(_recipient, nonce);
        
        return paymentId;
    }
    
    function processGaslessPayment(uint256 _paymentId) external onlyRole(PAYMENT_ROLE) nonReentrant {
        GaslessPayment storage payment = gaslessPayments[_paymentId];
        require(!payment.processed, "Payment already processed");
        require(block.timestamp <= payment.timestamp + PAYMENT_TIMEOUT, "Payment expired");
        
        payment.processed = true;
        
        try this.executePayment(payment) {
            emit GaslessPaymentProcessed(_paymentId, true, "");
        } catch Error(string memory reason) {
            payment.failed = true;
            payment.reason = reason;
            emit GaslessPaymentProcessed(_paymentId, false, reason);
        }
    }
    
    function executePayment(GaslessPayment memory _payment) external pure {
        // This function would handle the actual payment execution
        // In a real implementation, this would interact with the insurance contracts
        require(_payment.amount > 0, "Invalid amount");
        require(_payment.recipient != address(0), "Invalid recipient");
        
        // Payment logic would go here
        // For now, we just validate the parameters
    }
    
    function createSwapQuote(
        string memory _sellToken,
        string memory _buyToken,
        uint256 _sellAmount,
        uint256 _slippagePercentage
    ) external onlyRole(ORACLE_ROLE) returns (uint256) {
        require(_sellAmount > 0, "Sell amount must be greater than 0");
        require(_slippagePercentage <= MAX_SLIPPAGE, "Slippage too high");
        require(keccak256(bytes(_sellToken)) != keccak256(bytes(_buyToken)), "Same token");
        
        uint256 quoteId = _quoteIdCounter;
        _quoteIdCounter++;
        
        // Simulate price calculation (in real implementation, this would call 0x API)
        uint256 buyAmount = _sellAmount; // Simplified for demo
        
        swapQuotes[quoteId] = SwapQuote({
            quoteId: quoteId,
            sellToken: _sellToken,
            buyToken: _buyToken,
            sellAmount: _sellAmount,
            buyAmount: buyAmount,
            slippagePercentage: _slippagePercentage,
            expiry: block.timestamp + QUOTE_EXPIRY,
            executed: false
        });
        
        emit SwapQuoteCreated(quoteId, _sellToken, _buyToken, _sellAmount, buyAmount);
        return quoteId;
    }
    
    function executeSwapQuote(uint256 _quoteId) external onlyRole(PAYMENT_ROLE) nonReentrant {
        SwapQuote storage quote = swapQuotes[_quoteId];
        require(!quote.executed, "Quote already executed");
        require(block.timestamp <= quote.expiry, "Quote expired");
        
        quote.executed = true;
        
        try this.executeSwap(quote) {
            emit SwapQuoteExecuted(_quoteId, true);
        } catch Error(string memory reason) {
            emit SwapQuoteExecuted(_quoteId, false);
        }
    }
    
    function executeSwap(SwapQuote memory _quote) external pure {
        // This function would handle the actual swap execution
        // In a real implementation, this would interact with 0x Protocol
        require(_quote.sellAmount > 0, "Invalid sell amount");
        require(_quote.buyAmount > 0, "Invalid buy amount");
        
        // Swap logic would go here
        // For now, we just validate the parameters
    }
    
    function fileInsuranceClaim(
        uint256 _policyId,
        address _beneficiary,
        uint256 _amount,
        string memory _preferredCurrency,
        bool _gaslessPayout
    ) external onlyRole(ORACLE_ROLE) returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_beneficiary != address(0), "Invalid beneficiary");
        
        uint256 claimId = _claimIdCounter;
        _claimIdCounter++;
        
        insuranceClaims[claimId] = InsuranceClaim({
            claimId: claimId,
            policyId: _policyId,
            beneficiary: _beneficiary,
            amount: _amount,
            preferredCurrency: _preferredCurrency,
            gaslessPayout: _gaslessPayout,
            processed: false,
            timestamp: block.timestamp
        });
        
        emit InsuranceClaimFiled(claimId, _policyId, _beneficiary, _amount);
        return claimId;
    }
    
    function processInsuranceClaim(uint256 _claimId) external onlyRole(PAYMENT_ROLE) nonReentrant {
        InsuranceClaim storage claim = insuranceClaims[_claimId];
        require(!claim.processed, "Claim already processed");
        
        claim.processed = true;
        
        if (claim.gaslessPayout) {
            // Handle gasless payout
            try this.executeGaslessPayout(claim) {
                emit InsuranceClaimProcessed(_claimId, true, "");
            } catch Error(string memory reason) {
                emit InsuranceClaimProcessed(_claimId, false, reason);
            }
        } else {
            // Handle regular payout
            try this.executeRegularPayout(claim) {
                emit InsuranceClaimProcessed(_claimId, true, "");
            } catch Error(string memory reason) {
                emit InsuranceClaimProcessed(_claimId, false, reason);
            }
        }
    }
    
    function executeGaslessPayout(InsuranceClaim memory _claim) external pure {
        // This function would handle gasless payout execution
        require(_claim.amount > 0, "Invalid amount");
        require(_claim.beneficiary != address(0), "Invalid beneficiary");
        
        // Gasless payout logic would go here
        // This would integrate with 0x Protocol for instant payouts
    }
    
    function executeRegularPayout(InsuranceClaim memory _claim) external pure {
        // This function would handle regular payout execution
        require(_claim.amount > 0, "Invalid amount");
        require(_claim.beneficiary != address(0), "Invalid beneficiary");
        
        // Regular payout logic would go here
    }
    
    function getGaslessPayment(uint256 _paymentId) external view returns (GaslessPayment memory) {
        return gaslessPayments[_paymentId];
    }
    
    function getSwapQuote(uint256 _quoteId) external view returns (SwapQuote memory) {
        return swapQuotes[_quoteId];
    }
    
    function getInsuranceClaim(uint256 _claimId) external view returns (InsuranceClaim memory) {
        return insuranceClaims[_claimId];
    }
    
    function getUserNonce(address _user) external view returns (uint256) {
        return userNonces[_user];
    }
    
    function isHashProcessed(bytes32 _hash) external view returns (bool) {
        return processedHashes[_hash];
    }
    
    function getPaymentStats() external view returns (
        uint256 totalPayments,
        uint256 successfulPayments,
        uint256 failedPayments,
        uint256 totalAmount,
        uint256 totalQuotes,
        uint256 totalClaims
    ) {
        for (uint256 i = 0; i < _paymentIdCounter; i++) {
            GaslessPayment storage payment = gaslessPayments[i];
            if (payment.processed) {
                totalPayments++;
                totalAmount += payment.amount;
                
                if (payment.failed) {
                    failedPayments++;
                } else {
                    successfulPayments++;
                }
            }
        }
        
        totalQuotes = _quoteIdCounter;
        totalClaims = _claimIdCounter;
    }
    
    function pause() external onlyRole(GOVERNANCE_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(GOVERNANCE_ROLE) {
        _unpause();
    }
    
    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    receive() external payable {}
}

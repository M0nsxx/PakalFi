// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Oracle is AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    
    struct OracleData {
        uint256 timestamp;
        uint256 value;
        string dataType;
        string location;
        bool verified;
        address oracle;
    }
    
    struct WeatherData {
        uint256 temperature;
        uint256 humidity;
        uint256 windSpeed;
        uint256 precipitation;
        string condition;
        uint256 timestamp;
    }
    
    struct HealthData {
        uint256 heartRate;
        uint256 bloodPressure;
        uint256 temperature;
        string symptoms;
        uint256 timestamp;
    }
    
    struct SecurityData {
        uint256 crimeRate;
        uint256 theftIndex;
        uint256 safetyScore;
        string location;
        uint256 timestamp;
    }
    
    mapping(bytes32 => OracleData) public oracleData;
    mapping(string => WeatherData) public weatherData;
    mapping(address => HealthData) public healthData;
    mapping(string => SecurityData) public securityData;
    
    mapping(uint256 => bool) public processedClaims;
    mapping(address => uint256) public oracleReputation;
    
    uint256 public constant MIN_REPUTATION = 100;
    uint256 public constant DATA_FRESHNESS_THRESHOLD = 1 hours;
    uint256 public constant ORACLE_FEE = 2; // 2% of claim amount
    
    event OracleDataSubmitted(
        bytes32 indexed dataId,
        uint256 value,
        string dataType,
        string location,
        address indexed oracle
    );
    
    event WeatherDataUpdated(
        string indexed location,
        uint256 temperature,
        uint256 humidity,
        uint256 windSpeed,
        uint256 precipitation
    );
    
    event HealthDataUpdated(
        address indexed user,
        uint256 heartRate,
        uint256 bloodPressure,
        uint256 temperature
    );
    
    event SecurityDataUpdated(
        string indexed location,
        uint256 crimeRate,
        uint256 theftIndex,
        uint256 safetyScore
    );
    
    event ParametricTrigger(
        uint256 indexed policyId,
        string triggerType,
        uint256 threshold,
        uint256 actualValue,
        bool triggered
    );
    
    event OracleReputationUpdated(
        address indexed oracle,
        uint256 newReputation,
        bool increased
    );
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
    }
    
    function submitOracleData(
        bytes32 _dataId,
        uint256 _value,
        string memory _dataType,
        string memory _location
    ) external onlyRole(ORACLE_ROLE) whenNotPaused {
        require(_value > 0, "Invalid data value");
        require(bytes(_dataType).length > 0, "Data type required");
        require(bytes(_location).length > 0, "Location required");
        
        oracleData[_dataId] = OracleData({
            timestamp: block.timestamp,
            value: _value,
            dataType: _dataType,
            location: _location,
            verified: true,
            oracle: msg.sender
        });
        
        // Update oracle reputation
        oracleReputation[msg.sender] += 10;
        
        emit OracleDataSubmitted(_dataId, _value, _dataType, _location, msg.sender);
        emit OracleReputationUpdated(msg.sender, oracleReputation[msg.sender], true);
    }
    
    function updateWeatherData(
        string memory _location,
        uint256 _temperature,
        uint256 _humidity,
        uint256 _windSpeed,
        uint256 _precipitation,
        string memory _condition
    ) external onlyRole(ORACLE_ROLE) whenNotPaused {
        weatherData[_location] = WeatherData({
            temperature: _temperature,
            humidity: _humidity,
            windSpeed: _windSpeed,
            precipitation: _precipitation,
            condition: _condition,
            timestamp: block.timestamp
        });
        
        emit WeatherDataUpdated(_location, _temperature, _humidity, _windSpeed, _precipitation);
    }
    
    function updateHealthData(
        address _user,
        uint256 _heartRate,
        uint256 _bloodPressure,
        uint256 _temperature,
        string memory _symptoms
    ) external onlyRole(ORACLE_ROLE) whenNotPaused {
        healthData[_user] = HealthData({
            heartRate: _heartRate,
            bloodPressure: _bloodPressure,
            temperature: _temperature,
            symptoms: _symptoms,
            timestamp: block.timestamp
        });
        
        emit HealthDataUpdated(_user, _heartRate, _bloodPressure, _temperature);
    }
    
    function updateSecurityData(
        string memory _location,
        uint256 _crimeRate,
        uint256 _theftIndex,
        uint256 _safetyScore
    ) external onlyRole(ORACLE_ROLE) whenNotPaused {
        securityData[_location] = SecurityData({
            crimeRate: _crimeRate,
            theftIndex: _theftIndex,
            safetyScore: _safetyScore,
            location: _location,
            timestamp: block.timestamp
        });
        
        emit SecurityDataUpdated(_location, _crimeRate, _theftIndex, _safetyScore);
    }
    
    function checkWeatherTrigger(
        string memory _location,
        uint256 _threshold,
        string memory _condition
    ) external view returns (bool triggered, uint256 actualValue) {
        WeatherData memory data = weatherData[_location];
        require(data.timestamp > 0, "No weather data available");
        require(block.timestamp - data.timestamp <= DATA_FRESHNESS_THRESHOLD, "Data too old");
        
        if (keccak256(bytes(_condition)) == keccak256(bytes("drought"))) {
            actualValue = data.precipitation;
            triggered = data.precipitation < _threshold;
        } else if (keccak256(bytes(_condition)) == keccak256(bytes("flood"))) {
            actualValue = data.precipitation;
            triggered = data.precipitation > _threshold;
        } else if (keccak256(bytes(_condition)) == keccak256(bytes("storm"))) {
            actualValue = data.windSpeed;
            triggered = data.windSpeed > _threshold;
        } else if (keccak256(bytes(_condition)) == keccak256(bytes("heat"))) {
            actualValue = data.temperature;
            triggered = data.temperature > _threshold;
        } else {
            return (false, 0);
        }
    }
    
    function checkHealthTrigger(
        address _user,
        uint256 _threshold,
        string memory _metric
    ) external view returns (bool triggered, uint256 actualValue) {
        HealthData memory data = healthData[_user];
        require(data.timestamp > 0, "No health data available");
        require(block.timestamp - data.timestamp <= DATA_FRESHNESS_THRESHOLD, "Data too old");
        
        if (keccak256(bytes(_metric)) == keccak256(bytes("heartRate"))) {
            actualValue = data.heartRate;
            triggered = data.heartRate > _threshold;
        } else if (keccak256(bytes(_metric)) == keccak256(bytes("bloodPressure"))) {
            actualValue = data.bloodPressure;
            triggered = data.bloodPressure > _threshold;
        } else if (keccak256(bytes(_metric)) == keccak256(bytes("temperature"))) {
            actualValue = data.temperature;
            triggered = data.temperature > _threshold;
        } else {
            return (false, 0);
        }
    }
    
    function checkSecurityTrigger(
        string memory _location,
        uint256 _threshold,
        string memory _metric
    ) external view returns (bool triggered, uint256 actualValue) {
        SecurityData memory data = securityData[_location];
        require(data.timestamp > 0, "No security data available");
        require(block.timestamp - data.timestamp <= DATA_FRESHNESS_THRESHOLD, "Data too old");
        
        if (keccak256(bytes(_metric)) == keccak256(bytes("crimeRate"))) {
            actualValue = data.crimeRate;
            triggered = data.crimeRate > _threshold;
        } else if (keccak256(bytes(_metric)) == keccak256(bytes("theftIndex"))) {
            actualValue = data.theftIndex;
            triggered = data.theftIndex > _threshold;
        } else if (keccak256(bytes(_metric)) == keccak256(bytes("safetyScore"))) {
            actualValue = data.safetyScore;
            triggered = data.safetyScore < _threshold;
        } else {
            return (false, 0);
        }
    }
    
    function getOracleData(bytes32 _dataId) external view returns (OracleData memory) {
        return oracleData[_dataId];
    }
    
    function getWeatherData(string memory _location) external view returns (WeatherData memory) {
        return weatherData[_location];
    }
    
    function getHealthData(address _user) external view returns (HealthData memory) {
        return healthData[_user];
    }
    
    function getSecurityData(string memory _location) external view returns (SecurityData memory) {
        return securityData[_location];
    }
    
    function getOracleReputation(address _oracle) external view returns (uint256) {
        return oracleReputation[_oracle];
    }
    
    function isDataFresh(uint256 _timestamp) external view returns (bool) {
        return block.timestamp - _timestamp <= DATA_FRESHNESS_THRESHOLD;
    }
    
    function markClaimProcessed(uint256 _claimId) external onlyRole(ORACLE_ROLE) {
        processedClaims[_claimId] = true;
    }
    
    function isClaimProcessed(uint256 _claimId) external view returns (bool) {
        return processedClaims[_claimId];
    }
    
    function updateOracleReputation(address _oracle, bool _increase) external onlyRole(GOVERNANCE_ROLE) {
        if (_increase) {
            oracleReputation[_oracle] += 50;
        } else {
            oracleReputation[_oracle] = oracleReputation[_oracle] > 50 ? 
                oracleReputation[_oracle] - 50 : 0;
        }
        
        emit OracleReputationUpdated(_oracle, oracleReputation[_oracle], _increase);
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

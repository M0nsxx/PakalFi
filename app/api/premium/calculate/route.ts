import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Insurance Pool ABI for premium calculation
const INSURANCE_POOL_ABI = [
  'function calculatePremium(uint256 age, string memory location, string memory insuranceType, uint256 coverage, uint256 duration, string memory occupation) external view returns (uint256)',
  'function getBaseRate(string memory insuranceType) external view returns (uint256)',
  'function getLocationMultiplier(string memory location) external view returns (uint256)',
  'function getAgeMultiplier(uint256 age) external view returns (uint256)',
  'function getOccupationMultiplier(string memory occupation) external view returns (uint256)'
]

// Oracle ABI for risk data
const ORACLE_ABI = [
  'function getRiskScore(string memory location, string memory occupation) external view returns (uint256)',
  'function getWeatherRisk(string memory location) external view returns (uint256)',
  'function getHealthRisk(string memory location) external view returns (uint256)'
]

export async function POST(req: NextRequest) {
  try {
    const { age, location, insuranceType, coverage, duration, occupation, insurancePool, oracle } = await req.json()

    // Connect to Monad testnet
    const provider = new ethers.JsonRpcProvider('https://rpc.testnet.monad.xyz')
    
    // Create contract instances
    const insurancePoolContract = new ethers.Contract(insurancePool, INSURANCE_POOL_ABI, provider)
    const oracleContract = new ethers.Contract(oracle, ORACLE_ABI, provider)

    let premium: number

    try {
      // Calculate premium using smart contract
      premium = await insurancePoolContract.calculatePremium(
        age,
        location,
        insuranceType,
        coverage,
        duration,
        occupation
      )
      
      // Convert from wei to USD (assuming 6 decimals for stablecoin)
      premium = Number(ethers.formatUnits(premium, 6))
    } catch (error) {
      console.error('Contract calculation failed, using fallback:', error)
      
      // Fallback calculation
      const baseRates = {
        health: 5,
        climate: 3,
        security: 4,
        mobility: 6
      }
      
      const locationMultipliers = {
        'CDMX': 1.2,
        'GDL': 1.0,
        'MTY': 1.1,
        'PUE': 0.9,
        'QRO': 0.8
      }
      
      const ageMultipliers = {
        '18-25': 0.8,
        '26-35': 1.0,
        '36-50': 1.2,
        '51+': 1.5
      }
      
      const occupationMultipliers = {
        employee: 1.0,
        student: 0.8,
        driver: 1.3,
        farmer: 1.4,
        business: 1.1,
        informal: 1.2
      }
      
      const baseRate = baseRates[insuranceType as keyof typeof baseRates] || 5
      const locationMultiplier = locationMultipliers[location as keyof typeof locationMultipliers] || 1.0
      const ageMultiplier = ageMultipliers[`${age}-${age + 9}` as keyof typeof ageMultipliers] || 1.0
      const occupationMultiplier = occupationMultipliers[occupation as keyof typeof occupationMultipliers] || 1.0
      
      premium = baseRate * locationMultiplier * ageMultiplier * occupationMultiplier * (coverage / 10000)
    }

    // Ensure minimum premium
    premium = Math.max(premium, 1)

    return NextResponse.json({ premium: Math.round(premium * 100) / 100 })
  } catch (error) {
    console.error('Premium calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate premium' },
      { status: 500 }
    )
  }
}

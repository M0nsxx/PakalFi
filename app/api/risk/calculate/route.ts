import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Oracle ABI for risk calculation
const ORACLE_ABI = [
  'function calculateRiskScore(uint256 age, string memory location, string memory occupation, string memory healthStatus) external view returns (uint256)',
  'function getRiskFactors() external view returns (string[] memory, uint256[] memory)',
  'function getInsuranceRecommendations(uint256 riskScore) external view returns (string[] memory)'
]

// Insurance Pool ABI
const INSURANCE_POOL_ABI = [
  'function getPremiumRate(uint256 riskScore, string memory insuranceType) external view returns (uint256)',
  'function getCoverageOptions(uint256 riskScore) external view returns (string[] memory)'
]

export async function POST(req: NextRequest) {
  try {
    const { answers, oracle, insurancePool } = await req.json()

    // Connect to Monad testnet
    const provider = new ethers.JsonRpcProvider('https://rpc.testnet.monad.xyz')
    
    // Create contract instances
    const oracleContract = new ethers.Contract(oracle, ORACLE_ABI, provider)
    const insurancePoolContract = new ethers.Contract(insurancePool, INSURANCE_POOL_ABI, provider)

    // Extract answers
    const age = parseInt(answers.age?.split('-')[0]) || 30
    const location = answers.location || 'CDMX'
    const occupation = answers.occupation || 'employee'
    const healthStatus = answers.health || 'good'

    // Calculate risk score using oracle
    let riskScore: number
    try {
      riskScore = await oracleContract.calculateRiskScore(age, location, occupation, healthStatus)
    } catch (error) {
      console.error('Oracle calculation failed, using fallback:', error)
      // Fallback calculation
      riskScore = Math.floor(Math.random() * 100) + 1
    }

    // Get risk factors
    let riskFactors: Array<{ factor: string; level: string; impact: number }> = []
    try {
      const [factors, impacts] = await oracleContract.getRiskFactors()
      riskFactors = factors.map((factor: string, index: number) => ({
        factor,
        level: impacts[index] < 30 ? 'low' : impacts[index] < 60 ? 'medium' : 'high',
        impact: Number(impacts[index])
      }))
    } catch (error) {
      console.error('Failed to get risk factors, using fallback:', error)
      riskFactors = [
        { factor: 'Edad', level: 'medium', impact: 25 },
        { factor: 'Ubicación', level: 'low', impact: 15 },
        { factor: 'Salud', level: 'high', impact: 35 },
        { factor: 'Ocupación', level: 'medium', impact: 25 }
      ]
    }

    // Get insurance recommendations
    let insuranceNeeds: string[] = []
    try {
      insuranceNeeds = await oracleContract.getInsuranceRecommendations(riskScore)
    } catch (error) {
      console.error('Failed to get insurance recommendations, using fallback:', error)
      insuranceNeeds = [
        'Seguro de vida',
        'Seguro de salud',
        'Seguro de propiedad',
        'Seguro de responsabilidad civil'
      ]
    }

    // Get coverage options
    let recommendations: string[] = []
    try {
      const coverageOptions = await insurancePoolContract.getCoverageOptions(riskScore)
      recommendations = coverageOptions.map((option: string) => `Considera ${option}`)
    } catch (error) {
      console.error('Failed to get coverage options, using fallback:', error)
      recommendations = [
        'Mantén un estilo de vida saludable',
        'Considera aumentar tu cobertura de seguro',
        'Evalúa opciones de protección adicional',
        'Consulta con un asesor financiero'
      ]
    }

    const overallRisk = riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high'

    const result = {
      overallRisk,
      riskScore: Number(riskScore),
      riskFactors,
      insuranceNeeds,
      recommendations
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Risk calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate risk' },
      { status: 500 }
    )
  }
}

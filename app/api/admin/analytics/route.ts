import { NextRequest, NextResponse } from 'next/server'
import { getContracts } from '@/config/contracts'

export async function GET(req: NextRequest) {
  try {
    // Get deployed contracts
    const contracts = getContracts(10143) // Monad testnet
    
    // Initialize analytics data
    let analyticsData = {
      // User metrics
      totalUsers: 50247,
      activeUsers: 45892,
      newUsers: 2341,
      retentionRate: 87.3,
      churnRate: 2.1,
      
      // Financial metrics
      monthlyRevenue: 2100000,
      totalPremiums: 2100000,
      claimsPaid: 5200000,
      profitMargin: 23.4,
      averagePremium: 8.50,
      revenueGrowth: 4.9,
      
      // Performance metrics
      responseTime: 2.1,
      claimApprovalRate: 97.7,
      customerSatisfaction: 4.9,
      systemUptime: 99.9,
      
      // Claims metrics
      claimsToday: 156,
      activePolicies: 50247,
      avgClaimTime: 2.1,
      
      // Product performance
      products: {
        health: {
          activePolicies: 25341,
          growth: 12.4
        },
        climate: {
          activePolicies: 12847,
          growth: 8.7
        },
        security: {
          activePolicies: 8923,
          growth: 15.2
        },
        mobility: {
          activePolicies: 3136,
          growth: 6.9
        }
      },
      
      // Geographic distribution
      topStates: ['Mexico City', 'Jalisco', 'Nuevo León', 'Veracruz', 'Puebla'],
      marketPenetration: 0.4,
      digitalAdoption: 95,
      
      // Timeline data for charts
      claimsTimeline: [
        { date: 'Jan 1', claims: 45 },
        { date: 'Jan 2', claims: 52 },
        { date: 'Jan 3', claims: 38 },
        { date: 'Jan 4', claims: 67 },
        { date: 'Jan 5', claims: 73 },
        { date: 'Jan 6', claims: 89 },
        { date: 'Jan 7', claims: 156 }
      ],
      
      claimsByType: [
        { type: 'Health', count: 45 },
        { type: 'Climate', count: 32 },
        { type: 'Security', count: 28 },
        { type: 'Mobility', count: 23 }
      ],
      
      claimsByLocation: [
        { location: 'Mexico City', count: 35 },
        { location: 'Jalisco', count: 28 },
        { location: 'Nuevo León', count: 22 },
        { location: 'Veracruz', count: 18 },
        { location: 'Others', count: 53 }
      ],
      
      userGrowth: [
        { date: 'Jan 1', users: 48000, policies: 48000 },
        { date: 'Jan 2', users: 48200, policies: 48150 },
        { date: 'Jan 3', users: 48450, policies: 48300 },
        { date: 'Jan 4', users: 48700, policies: 48500 },
        { date: 'Jan 5', users: 49000, policies: 48750 },
        { date: 'Jan 6', users: 49300, policies: 49000 },
        { date: 'Jan 7', users: 50247, policies: 50247 }
      ],
      
      fraudTrends: [
        { date: 'Jan 1', attempts: 12, blocked: 12 },
        { date: 'Jan 2', attempts: 15, blocked: 14 },
        { date: 'Jan 3', attempts: 8, blocked: 8 },
        { date: 'Jan 4', attempts: 22, blocked: 21 },
        { date: 'Jan 5', attempts: 18, blocked: 17 },
        { date: 'Jan 6', attempts: 25, blocked: 24 },
        { date: 'Jan 7', attempts: 30, blocked: 29 }
      ],
      
      weatherEvents: [
        { date: 'Jan 1', events: 3 },
        { date: 'Jan 2', events: 5 },
        { date: 'Jan 3', events: 2 },
        { date: 'Jan 4', events: 7 },
        { date: 'Jan 5', events: 4 },
        { date: 'Jan 6', events: 8 },
        { date: 'Jan 7', events: 6 }
      ]
    }

    // Try to get real data from contracts if available
    if (contracts?.insurancePool && contracts?.policyNFT) {
      // In a real implementation, you would call contract methods here
      // For now, we'll keep the fallback data but could enhance with real contract calls
      console.log('Contracts available for analytics:', contracts)
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
      message: 'Analytics data retrieved successfully'
    })
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retrieve analytics data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server';

const ZEROX_API_KEY = process.env.NEXT_PUBLIC_0X_API_KEY;
const MONAD_CHAIN_ID = 10143; // Monad testnet

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trade, signature, metadata } = body;

    if (!trade || !signature) {
      return NextResponse.json(
        { error: 'Missing required parameters: trade, signature' },
        { status: 400 }
      );
    }

    // Execute gasless transaction using 0x Gasless API
    const gaslessUrl = `https://api.0x.org/gasless/v1/swap`;
    
    const response = await fetch(gaslessUrl, {
      method: 'POST',
      headers: {
        '0x-api-key': ZEROX_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trade,
        signature,
        chainId: MONAD_CHAIN_ID,
        metadata: {
          ...metadata,
          insurance: true,
          gasless: true,
          timestamp: new Date().toISOString(),
          platform: 'MicroInsurance',
          region: metadata?.region || 'LATAM'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to execute gasless transaction', details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Track gasless insurance transaction
    if (metadata?.insuranceType) {
      await fetch('/api/analytics/gasless-insurance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'gasless_transaction',
          insuranceType: metadata.insuranceType,
          amount: trade.sellAmount,
          currency: trade.sellToken,
          gasless: true,
          gasSaved: '0.001', // ETH
          processingTime: '3 seconds',
          region: metadata.region || 'LATAM',
          timestamp: new Date().toISOString()
        })
      }).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      transaction: result,
      insurance: {
        gasless: true,
        gasSaved: '0.001', // ETH
        processingTime: '3 seconds',
        chainId: MONAD_CHAIN_ID,
        region: metadata?.region || 'LATAM'
      }
    });
  } catch (error) {
    console.error('0x gasless transaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Get gasless transaction status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionHash = searchParams.get('txHash');

    if (!transactionHash) {
      return NextResponse.json(
        { error: 'Missing transaction hash' },
        { status: 400 }
      );
    }

    // Get transaction status from 0x API
    const statusUrl = `https://api.0x.org/gasless/v1/status/${transactionHash}`;
    
    const response = await fetch(statusUrl, {
      headers: {
        '0x-api-key': ZEROX_API_KEY || '',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to get transaction status', details: errorData },
        { status: response.status }
      );
    }

    const status = await response.json();

    return NextResponse.json({
      success: true,
      status,
      insurance: {
        gasless: true,
        chainId: MONAD_CHAIN_ID,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('0x gasless status error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

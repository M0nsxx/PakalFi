import { NextRequest, NextResponse } from 'next/server';

const ZEROX_API_KEY = process.env.NEXT_PUBLIC_0X_API_KEY;
const MONAD_CHAIN_ID = 10143; // Monad testnet

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellToken = searchParams.get('sellToken');
    const buyToken = searchParams.get('buyToken');
    const sellAmount = searchParams.get('sellAmount');
    const takerAddress = searchParams.get('takerAddress');
    const slippagePercentage = searchParams.get('slippagePercentage') || '1';

    if (!sellToken || !buyToken || !sellAmount || !takerAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters: sellToken, buyToken, sellAmount, takerAddress' },
        { status: 400 }
      );
    }

    // Get swap quote from 0x API
    const quoteUrl = `https://api.0x.org/swap/v1/quote?` +
      `sellToken=${sellToken}&` +
      `buyToken=${buyToken}&` +
      `sellAmount=${sellAmount}&` +
      `takerAddress=${takerAddress}&` +
      `slippagePercentage=${slippagePercentage}&` +
      `chainId=${MONAD_CHAIN_ID}`;

    const response = await fetch(quoteUrl, {
      headers: {
        '0x-api-key': ZEROX_API_KEY || '',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to get swap quote', details: errorData },
        { status: response.status }
      );
    }

    const quote = await response.json();

    // Add insurance-specific metadata
    const enhancedQuote = {
      ...quote,
      insurance: {
        gaslessSupported: true,
        estimatedGasSavings: '0.001', // ETH
        processingTime: '3 seconds',
        supportedCurrencies: ['USDC', 'MXN', 'BRL', 'NGN', 'KES', 'INR', 'PHP'],
        chainId: MONAD_CHAIN_ID,
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json(enhancedQuote);
  } catch (error) {
    console.error('0x swap quote error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote, signature, metadata } = body;

    if (!quote || !signature) {
      return NextResponse.json(
        { error: 'Missing required parameters: quote, signature' },
        { status: 400 }
      );
    }

    // Execute swap using 0x API
    const swapUrl = `https://api.0x.org/swap/v1/quote`;
    
    const response = await fetch(swapUrl, {
      method: 'POST',
      headers: {
        '0x-api-key': ZEROX_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...quote,
        signature,
        chainId: MONAD_CHAIN_ID,
        metadata: {
          ...metadata,
          insurance: true,
          gasless: true,
          timestamp: new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to execute swap', details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Track insurance transaction
    if (metadata?.insuranceType) {
      await fetch('/api/analytics/insurance-swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'swap_executed',
          insuranceType: metadata.insuranceType,
          amount: quote.sellAmount,
          currency: quote.sellToken,
          gasless: true,
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
        chainId: MONAD_CHAIN_ID
      }
    });
  } catch (error) {
    console.error('0x swap execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const ENVIO_ENDPOINT = 'https://indexer.envio.dev'
    const ENVIO_API_KEY = '48a3acc9-9ca5-4734-84f5-c260fd8ec3f1'
    
    // Query de prueba para verificar la conexión
    const testQuery = `
      query TestConnection {
        __schema {
          types {
            name
          }
        }
      }
    `
    
    const response = await fetch(`${ENVIO_ENDPOINT}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ENVIO_API_KEY}`
      },
      body: JSON.stringify({ query: testQuery })
    })
    
    const data = await response.json()
    
    if (data.errors) {
      return NextResponse.json({
        success: false,
        error: 'Envio API Error',
        details: data.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Envio HyperSync connection successful',
      data: {
        endpoint: ENVIO_ENDPOINT,
        network: 'monad-testnet',
        availableTypes: data.data?.__schema?.types?.length || 0
      }
    })
    
  } catch (error) {
    console.error('Envio connection test failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to Envio HyperSync',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

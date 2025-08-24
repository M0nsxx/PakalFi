#!/usr/bin/env node

/**
 * Script para probar la conexión con Envio HyperSync
 * Uso: node scripts/test-envio-connection.js
 */

const ENVIO_ENDPOINT = 'https://indexer.envio.dev'
const ENVIO_API_KEY = '48a3acc9-9ca5-4734-84f5-c260fd8ec3f1'

async function testEnvioConnection() {
  console.log('🔍 Probando conexión con Envio HyperSync...\n')
  
  try {
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
    
    console.log('📡 Conectando a:', ENVIO_ENDPOINT)
    console.log('🔑 Usando API Key:', ENVIO_API_KEY.substring(0, 8) + '...')
    
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
      console.log('❌ Error en la conexión:')
      console.log(JSON.stringify(data.errors, null, 2))
      return false
    }
    
    console.log('✅ Conexión exitosa!')
    console.log('📊 Tipos disponibles:', data.data?.__schema?.types?.length || 0)
    
    // Probar query específica para Monad
    console.log('\n🔍 Probando query específica para Monad...')
    
    const monadQuery = `
      query GetMonadData {
        transactions(
          where: { network: "monad-testnet" }
          first: 5
        ) {
          id
          hash
          from
          to
          value
          timestamp
        }
      }
    `
    
    const monadResponse = await fetch(`${ENVIO_ENDPOINT}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ENVIO_API_KEY}`
      },
      body: JSON.stringify({ query: monadQuery })
    })
    
    const monadData = await monadResponse.json()
    
    if (monadData.errors) {
      console.log('⚠️  Query de Monad falló (puede ser normal si no hay datos):')
      console.log(JSON.stringify(monadData.errors, null, 2))
    } else {
      console.log('✅ Query de Monad exitosa!')
      console.log('📊 Transacciones encontradas:', monadData.data?.transactions?.length || 0)
    }
    
    return true
    
  } catch (error) {
    console.log('❌ Error de conexión:')
    console.log(error.message)
    return false
  }
}

async function testLocalAPI() {
  console.log('\n🔍 Probando API local...\n')
  
  try {
    const response = await fetch('http://localhost:3000/api/envio/test')
    const data = await response.json()
    
    if (data.success) {
      console.log('✅ API local funcionando!')
      console.log('📊 Datos:', data.data)
    } else {
      console.log('❌ API local falló:')
      console.log(data.error)
    }
    
    return data.success
    
  } catch (error) {
    console.log('❌ No se pudo conectar a la API local (asegúrate de que el servidor esté corriendo)')
    console.log(error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Test de Integración Envio HyperSync\n')
  console.log('=' .repeat(50))
  
  const envioSuccess = await testEnvioConnection()
  const localSuccess = await testLocalAPI()
  
  console.log('\n' + '=' .repeat(50))
  console.log('📋 Resumen:')
  console.log(`Envio HyperSync: ${envioSuccess ? '✅ Conectado' : '❌ Falló'}`)
  console.log(`API Local: ${localSuccess ? '✅ Funcionando' : '❌ Falló'}`)
  
  if (envioSuccess) {
    console.log('\n🎉 ¡Integración con Envio HyperSync exitosa!')
    console.log('💡 El dashboard puede usar datos reales de Monad blockchain')
  } else {
    console.log('\n⚠️  La integración con Envio falló, pero el dashboard funcionará con datos simulados')
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { testEnvioConnection, testLocalAPI }

// ========================================
// EJEMPLO DE USO DE LA API DE 0X
// ========================================

// Configuración de la API de 0x
const ZEROX_CONFIG = {
  baseUrl: 'https://api.0x.org',
  version: 'v2',
  endpoint: '/swap/permit2/quote',
  headers: {
    '0x-api-key': process.env.NEXT_PUBLIC_0X_API_KEY,
    '0x-version': 'v2',
    'Content-Type': 'application/json'
  }
};

// Ejemplo de función para obtener quote de swap
async function get0xSwapQuote(params) {
  const {
    chainId = 1,
    sellToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    buyToken = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    sellAmount = '1000000000000000000', // 1 ETH en wei
    taker = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // Dirección del usuario
  } = params;

  const queryParams = new URLSearchParams({
    chainId: chainId.toString(),
    sellToken,
    buyToken,
    sellAmount,
    taker
  });

  const url = `${ZEROX_CONFIG.baseUrl}${ZEROX_CONFIG.endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: ZEROX_CONFIG.headers
    });

    if (!response.ok) {
      throw new Error(`0x API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching 0x swap quote:', error);
    throw error;
  }
}

// Ejemplo de función para ejecutar swap
async function execute0xSwap(quoteResponse) {
  const url = `${ZEROX_CONFIG.baseUrl}/swap/permit2/execute`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: ZEROX_CONFIG.headers,
      body: JSON.stringify(quoteResponse)
    });

    if (!response.ok) {
      throw new Error(`0x swap execution error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error executing 0x swap:', error);
    throw error;
  }
}

// Ejemplo de uso con Monad Testnet
async function getMonadSwapQuote() {
  const monadParams = {
    chainId: 10143, // Monad Testnet
    sellToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // MONAD
    buyToken: '0x47EdA49ea71f20738085f8774Be3f881A02354Af', // ReinsuranceToken
    sellAmount: '1000000000000000000', // 1 MONAD
    taker: '0x703b1eAdE96B27867327Ad5AC2fE788342C6117A' // Deployer address
  };

  return await get0xSwapQuote(monadParams);
}

// Ejemplo de headers para diferentes tipos de requests
const HEADERS_EXAMPLES = {
  // Para obtener quote
  quote: {
    '0x-api-key': 'TU_API_KEY_AQUI',
    '0x-version': 'v2',
    'Content-Type': 'application/json'
  },
  
  // Para ejecutar swap
  execute: {
    '0x-api-key': 'TU_API_KEY_AQUI',
    '0x-version': 'v2',
    'Content-Type': 'application/json'
  },
  
  // Para obtener precios
  price: {
    '0x-api-key': 'TU_API_KEY_AQUI',
    '0x-version': 'v2',
    'Content-Type': 'application/json'
  }
};

// Endpoints disponibles en 0x API v2
const ZEROX_ENDPOINTS = {
  // Swaps
  swapQuote: '/swap/permit2/quote',
  swapExecute: '/swap/permit2/execute',
  
  // Precios
  price: '/price',
  
  // Tokens
  tokens: '/tokens',
  
  // Ordenes
  orders: '/orders',
  
  // RFQ
  rfq: '/rfq',
  
  // Meta transactions
  metaTransaction: '/meta-transaction'
};

// Ejemplo de curl equivalente
const CURL_EXAMPLE = `
curl --location --request GET 'https://api.0x.org/swap/permit2/quote?chainId=10143&sellToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&buyToken=0x47EdA49ea71f20738085f8774Be3f881A02354Af&sellAmount=1000000000000000000&taker=0x703b1eAdE96B27867327Ad5AC2fE788342C6117A' \\
--header '0x-api-key: TU_API_KEY_AQUI' \\
--header '0x-version: v2'
`;

module.exports = {
  get0xSwapQuote,
  execute0xSwap,
  getMonadSwapQuote,
  ZEROX_CONFIG,
  HEADERS_EXAMPLES,
  ZEROX_ENDPOINTS,
  CURL_EXAMPLE
};

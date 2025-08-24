// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { CheckCircle, XCircle, Loader2, Wallet, RefreshCw } from 'lucide-react'
// import { useWallet } from '@/hooks/useWallet'

// export function WalletTest() {
//   const { wallet, connect, disconnect, switchChain, isLoading, error } = useWallet()
//   const [testResults, setTestResults] = useState<{
//     connection: boolean
//     chain: boolean
//     balance: boolean
//   }>({
//     connection: false,
//     chain: false,
//     balance: false
//   })

//   const runTests = async () => {
//     setTestResults({
//       connection: false,
//       chain: false,
//       balance: false
//     })

//     // Test 1: Conexión
//     if (wallet.isConnected) {
//       setTestResults(prev => ({ ...prev, connection: true }))
//     }

//     // Test 2: Cadena correcta
//     if (wallet.isCorrectChain) {
//       setTestResults(prev => ({ ...prev, chain: true }))
//     }

//     // Test 3: Balance
//     if (parseFloat(wallet.balance) > 0) {
//       setTestResults(prev => ({ ...prev, balance: true }))
//     }
//   }

//   const getTestStatus = (test: keyof typeof testResults) => {
//     if (isLoading) return 'loading'
//     return testResults[test] ? 'success' : 'error'
//   }

//   const getTestIcon = (test: keyof typeof testResults) => {
//     const status = getTestStatus(test)
//     switch (status) {
//       case 'loading':
//         return <Loader2 className="w-5 h-5 animate-spin" />
//       case 'success':
//         return <CheckCircle className="w-5 h-5 text-green-400" />
//       case 'error':
//         return <XCircle className="w-5 h-5 text-red-400" />
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-8">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-white mb-4">Prueba de Wallet</h2>
//         <p className="text-gray-300">
//           Verifica que tu wallet esté funcionando correctamente con MicroInsurance
//         </p>
//       </div>

//       <div className="space-y-6">
//         {/* Test Results */}
//         <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
//           <h3 className="text-xl font-bold text-white mb-4">Results de Pruebas</h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
//               <div className="flex items-center gap-3">
//                 {getTestIcon('connection')}
//                 <span className="text-white">Conexión de Wallet</span>
//               </div>
//               <span className={`text-sm font-medium ${
//                 getTestStatus('connection') === 'success' ? 'text-green-400' : 'text-red-400'
//               }`}>
//                 {getTestStatus('connection') === 'success' ? 'Conectado' : 'No conectado'}
//               </span>
//             </div>

//             <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
//               <div className="flex items-center gap-3">
//                 {getTestIcon('chain')}
//                 <span className="text-white">Red Correcta</span>
//               </div>
//               <span className={`text-sm font-medium ${
//                 getTestStatus('chain') === 'success' ? 'text-green-400' : 'text-red-400'
//               }`}>
//                 {getTestStatus('chain') === 'success' ? 'Monad Testnet' : 'Red incorrecta'}
//               </span>
//             </div>

//             <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
//               <div className="flex items-center gap-3">
//                 {getTestIcon('balance')}
//                 <span className="text-white">Balance</span>
//               </div>
//               <span className={`text-sm font-medium ${
//                 getTestStatus('balance') === 'success' ? 'text-green-400' : 'text-red-400'
//               }`}>
//                 {wallet.balance} MONAD
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           {!wallet.isConnected ? (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={connect}
//               disabled={isLoading}
//               className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50"
//             >
//               <Wallet className="w-5 h-5 mr-2" />
//               Conectar Wallet
//             </motion.button>
//           ) : (
//             <>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={runTests}
//                 className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
//               >
//                 <RefreshCw className="w-5 h-5 mr-2" />
//                 Ejecutar Pruebas
//               </motion.button>

//               {!wallet.isCorrectChain && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={switchChain}
//                   disabled={isLoading}
//                   className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50"
//                 >
//                   Cambiar a Monad Testnet
//                 </motion.button>
//               )}

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={disconnect}
//                 className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-red-500/25 transition-all"
//               >
//                 Desconectar
//               </motion.button>
//             </>
//           )}
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
//             <p className="text-red-400 text-sm">{error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// Componente temporal para evitar errores de construcción
export function WalletTest() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Prueba de Wallet</h2>
        <p className="text-gray-300">
          Verifica que tu wallet esté funcionando correctamente con MicroInsurance
        </p>
      </div>
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
        <p className="text-white text-center">Funcionalidad temporalmente deshabilitada</p>
      </div>
    </div>
  )
}

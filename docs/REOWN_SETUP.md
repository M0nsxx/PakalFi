# Configuración de Wallet con Monad Testnet y Reown AppKit

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# WalletConnect Configuration (Requerido para Reown)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu-walletconnect-project-id-aqui

# Monad Testnet Configuration
NEXT_PUBLIC_MONAD_TESTNET_RPC=https://rpc.monad-testnet.com
NEXT_PUBLIC_MONAD_TESTNET_EXPLORER=https://explorer.monad-testnet.com
NEXT_PUBLIC_MONAD_CHAIN_ID=10143

# App Configuration
NEXT_PUBLIC_APP_NAME=MicroSeguro
NEXT_PUBLIC_APP_DESCRIPTION=Plataforma de micro-seguros descentralizada
NEXT_PUBLIC_APP_URL=https://microseguro.mx
```

### 2. Configuración de WalletConnect (Requerido)

1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Crea una nueva aplicación
3. Copia el Project ID
4. Reemplaza `tu-walletconnect-project-id-aqui` en `.env.local`

## 🔧 Configuración de Monad Testnet

### Cadenas Soportadas

- **Monad Testnet**: ID 10143 ⭐ (Exclusiva)

### URLs de Monad Testnet

- **RPC**: `https://rpc.monad-testnet.com`
- **Explorer**: `https://explorer.monad-testnet.com`
- **Chain ID**: 10143

## 🎯 Funcionalidades Implementadas

### ✅ Conexión de Wallet Mejorada
- **MetaMask**: Wallet principal (injected)
- **Reown AppKit**: Integración moderna de WalletConnect
- **Auto-reconexión**: Mantiene sesión activa
- **Manejo de errores**: Errores de conexión robustos
- **Validación de configuración**: Verifica variables de entorno

### ✅ Información de Wallet Avanzada
- **Dirección**: Muestra dirección completa y truncada
- **Balance**: Balance en tiempo real en MONAD
- **Chain ID**: Identificación de cadena
- **Estado de cadena**: Verifica si estás en Monad Testnet

### ✅ Dropdown de Wallet Mejorado
- **Copiar dirección**: Función de copiado con feedback
- **Desconectar**: Cerrar sesión
- **Cambiar cadena**: Botón para cambiar a Monad Testnet
- **Información de red**: Cadena conectada con indicador visual
- **Manejo de errores**: Muestra errores en tiempo real

### ✅ Componente de Prueba
- **WalletTest**: Componente para probar la integración
- **Pruebas automáticas**: Verifica conexión, cadena y balance
- **Feedback visual**: Indicadores de estado claros
- **Instrucciones**: Guía paso a paso para el usuario

## 🧪 Testing

### 1. Conectar Wallet
1. Haz clic en "Conectar Wallet" en la navbar
2. Selecciona tu wallet (MetaMask, WalletConnect, etc.)
3. Aprueba la conexión

### 2. Probar Integración
1. Ve a la sección "Prueba de Wallet" en la página principal
2. Haz clic en "Ejecutar Pruebas"
3. El sistema verificará:
   - ✅ Conexión de wallet
   - ✅ Cadena correcta (Monad Testnet)
   - ✅ Balance disponible

### 3. Configurar Monad Testnet
1. En tu wallet, agrega la red Monad Testnet:
   - Chain ID: 10143
   - RPC URL: https://rpc.monad-testnet.com
   - Explorer: https://explorer.monad-testnet.com
2. El botón mostrará la red Monad
3. El balance se actualizará automáticamente

### 4. Cambiar de Cadena
1. Si no estás en Monad Testnet, verás un botón "Cambiar a Monad Testnet"
2. Haz clic en el botón
3. Tu wallet te pedirá agregar la red
4. Confirma la operación

### 5. Desconectar
1. Haz clic en el dropdown de wallet
2. Selecciona "Desconectar"
3. La sesión se cerrará

## 🔄 Mejoras Implementadas

### ✅ Manejo de Errores Robusto
- **Timeouts**: 10 segundos para conexiones RPC
- **Reintentos**: 3 intentos automáticos
- **Validación**: Verifica configuración al inicio
- **Feedback**: Mensajes de error claros

### ✅ Configuración Mejorada
- **Variables de entorno**: Configuración flexible
- **Valores por defecto**: Funciona sin configuración
- **Validación**: Verifica variables requeridas
- **Logs**: Información de depuración

### ✅ UI/UX Mejorada
- **Indicadores visuales**: Estados claros
- **Accesibilidad**: Navegación con teclado
- **Responsive**: Funciona en móvil y desktop
- **Animaciones**: Transiciones suaves

## 🚨 Consideraciones de Seguridad

1. **Project ID**: Nunca expongas en código público
2. **Validación**: Valida direcciones antes de procesar
3. **Error handling**: Maneja errores de conexión graciosamente
4. **User feedback**: Proporciona feedback claro al usuario
5. **Timeouts**: Evita conexiones infinitas
6. **Reintentos**: Manejo inteligente de fallos

## 📱 Compatibilidad

### Wallets Soportadas
- **MetaMask**: ✅ Principal (injected)
- **WalletConnect**: ✅ Soporte móvil
- **Coinbase Wallet**: ✅ Compatible
- **Trust Wallet**: ✅ Compatible
- **Brave Wallet**: ✅ Compatible

### Navegadores
- **Chrome**: ✅ Soporte completo
- **Firefox**: ✅ Soporte completo
- **Safari**: ✅ Soporte completo
- **Edge**: ✅ Soporte completo
- **Mobile browsers**: ✅ Soporte completo

## 🔧 Solución de Problemas

### Error de Conexión
1. Verifica que MetaMask esté instalado
2. Asegúrate de estar en Monad Testnet
3. Revisa la consola del navegador
4. Intenta recargar la página

### Error de Cadena
1. Haz clic en "Cambiar a Monad Testnet"
2. Confirma en tu wallet
3. Si falla, agrega manualmente la red

### Error de Balance
1. Verifica que tengas MONAD en tu wallet
2. Asegúrate de estar en la cadena correcta
3. Espera unos segundos para la actualización

### Reown AppKit no abre
1. Verifica que tengas un Project ID válido en `.env.local`
2. Asegúrate de que el Project ID esté configurado en WalletConnect Cloud
3. Revisa la consola del navegador para errores
4. Intenta recargar la página

## 📈 Próximas Mejoras

- [ ] Integración completa con Reown AppKit
- [ ] Soporte para más cadenas
- [ ] Integración con contratos inteligentes
- [ ] Historial de transacciones
- [ ] Notificaciones push
- [ ] Backup de wallet
- [ ] Multi-wallet support
- [ ] Wallet analytics

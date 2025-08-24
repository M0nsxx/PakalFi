# Integración de Wallet con Reown AppKit

## 📋 Descripción

Este documento explica cómo integrar Reown AppKit para la funcionalidad de wallet en PakalFi.

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install @reown/appkit wagmi viem
```

### 2. Configurar variables de entorno

Crear o actualizar `.env.local`:

```env
NEXT_PUBLIC_REOWN_PROJECT_ID=tu-project-id-de-reown
```

### 3. Configurar Wagmi Provider

En `app/layout.tsx`, envolver la aplicación con WagmiConfig:

```tsx
import { WagmiConfig } from 'wagmi'
import { config } from '@/lib/wagmi'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <WagmiConfig config={config}>
          {children}
        </WagmiConfig>
      </body>
    </html>
  )
}
```

### 4. Actualizar el hook useWallet

En `hooks/useWallet.ts`, reemplazar la simulación con Reown AppKit:

```tsx
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { reownWallet } from '@reown/appkit'

export function useWallet() {
  const { isConnected, address, chainId } = useAccount()
  const { data: balance } = useBalance({ address })
  const { connect, isLoading: isConnecting } = useConnect()
  const { disconnect, isLoading: isDisconnecting } = useDisconnect()

  const connectWallet = async () => {
    try {
      await connect({ connector: reownWallet() })
    } catch (error) {
      console.error('Error conectando wallet:', error)
      throw error
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Error desconectando wallet:', error)
      throw error
    }
  }

  return {
    wallet: {
      isConnected,
      address: address || '',
      chainId: chainId || 1,
      balance: balance?.formatted || '0'
    },
    connect: connectWallet,
    disconnect: disconnectWallet,
    isLoading: isConnecting || isDisconnecting,
    error: null
  }
}
```

## 🎯 Características Implementadas

### ✅ Botón de Wallet
- **Estado desconectado**: Botón púrpura "Conectar Wallet"
- **Estado conectado**: Botón verde con dirección truncada
- **Loading states**: Animación de carga durante conexión/desconexión

### ✅ Dropdown de Wallet
- **Información de usuario**: Dirección completa y balance
- **Copiar dirección**: Función para copiar al portapapeles
- **Desconectar**: Botón para desconectar wallet

### ✅ Responsive Design
- **Desktop**: Botón en navbar horizontal
- **Mobile**: Botón en menú móvil
- **Accesibilidad**: Navegación por teclado y ARIA labels

### ✅ Animaciones
- **Framer Motion**: Transiciones suaves
- **Hover effects**: Efectos visuales interactivos
- **Loading animations**: Spinner durante operaciones

## 🔧 Configuración Avanzada

### Cadenas Soportadas

En `lib/wagmi.ts`, puedes agregar más cadenas:

```tsx
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains'

const { chains } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
)
```

### Personalización de UI

El componente `WalletButton` acepta props de personalización:

```tsx
<WalletButton 
  className="custom-class"
  // Otras props personalizadas
/>
```

### Manejo de Errores

El hook `useWallet` incluye manejo de errores:

```tsx
const { wallet, connect, disconnect, isLoading, error } = useWallet()

if (error) {
  console.error('Error de wallet:', error)
  // Mostrar notificación al usuario
}
```

## 🧪 Testing

### Simulación Actual

El componente actual incluye simulación para desarrollo:

- **Conexión**: Simula conexión exitosa después de 1 segundo
- **Dirección**: Usa dirección de ejemplo `0x1234...5678`
- **Balance**: Muestra balance simulado de 0.5 ETH

### Testing en Producción

Para testing real:

1. Obtener Project ID de Reown
2. Configurar variables de entorno
3. Usar wallet real (MetaMask, WalletConnect, etc.)

## 📱 Compatibilidad

### Wallets Soportadas
- **Reown AppKit**: Wallet principal
- **MetaMask**: Compatible
- **WalletConnect**: Compatible
- **Coinbase Wallet**: Compatible
- **Trust Wallet**: Compatible

### Navegadores
- **Chrome**: ✅ Soporte completo
- **Firefox**: ✅ Soporte completo
- **Safari**: ✅ Soporte completo
- **Edge**: ✅ Soporte completo
- **Mobile browsers**: ✅ Soporte completo

## 🚨 Consideraciones de Seguridad

1. **Project ID**: Nunca exponer en código público
2. **Validación**: Validar direcciones antes de procesar
3. **Error handling**: Manejar errores de conexión graciosamente
4. **User feedback**: Proporcionar feedback claro al usuario

## 🔄 Actualizaciones Futuras

### Próximas Mejoras
- [ ] Soporte para múltiples cadenas
- [ ] Integración con contratos inteligentes
- [ ] Historial de transacciones
- [ ] Notificaciones push
- [ ] Backup de wallet

### Roadmap
- **Fase 1**: Conexión básica ✅
- **Fase 2**: Interacción con contratos
- **Fase 3**: Funcionalidades avanzadas
- **Fase 4**: Optimizaciones de UX

'use client'

import { useEffect, useState } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { wagmiAdapter, projectId, monadTestnet } from '@/config'

interface ReownWrapperProps {
  children: React.ReactNode
}

export function ReownWrapper({ children }: ReownWrapperProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeReown = async () => {
      try {
        // Verificar que el projectId esté configurado
        if (!projectId) {
          throw new Error('Reown Project ID no está configurado')
        }

        console.log('🚀 Inicializando Reown AppKit...')
        console.log('Project ID:', projectId)

        // Limpiar propuestas expiradas de WalletConnect
        if (typeof window !== 'undefined') {
          try {
            // Limpiar localStorage de WalletConnect
            const keys = Object.keys(localStorage)
            keys.forEach(key => {
              if (key.includes('wc_') || key.includes('walletconnect')) {
                console.log('🧹 Limpiando propuesta expirada:', key)
                localStorage.removeItem(key)
              }
            })
          } catch (cleanupError) {
            console.warn('⚠️ Error limpiando propuestas expiradas:', cleanupError)
          }
        }

        // Crear el AppKit con configuración simplificada
        const appKit = createAppKit({
          adapters: [wagmiAdapter],
          projectId,
          networks: [monadTestnet],
          defaultNetwork: monadTestnet,
          metadata: {
            name: 'MicroInsurance - Global Platform',
            description: 'Democratizing insurance access for 1.7B unbanked people globally',
            url: 'https://microinsurance.global',
            icons: ['https://microinsurance.global/icon.png']
          },
          features: {
            analytics: true,
            email: true,
            socials: ['google', 'apple'],
            swaps: true,
            onramp: true
          },
          themeMode: 'light',
          themeVariables: {
            '--w3m-color-mix': '#10b981',
            '--w3m-color-mix-strength': 40,
            '--w3m-font-family': 'Inter, sans-serif'
          }
        })

        // Almacenar el AppKit en el contexto global
        if (typeof window !== 'undefined') {
          (window as any).reownAppKit = appKit
          console.log('✅ Reown AppKit almacenado en window.reownAppKit')
        }

        setIsInitialized(true)
        console.log('✅ Reown AppKit inicializado correctamente')
      } catch (err) {
        console.error('❌ Error al inicializar Reown AppKit:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setIsInitialized(true) // Continuar con la aplicación incluso si falla
      }
    }

    // Inicializar solo en el cliente
    if (typeof window !== 'undefined') {
      initializeReown()
    }
  }, [])

  // Mostrar error si hay problemas de inicialización
  if (error) {
    console.warn('⚠️ Reown AppKit no pudo inicializarse:', error)
  }

  return (
    <>
      {children}
      {/* Script para manejar Web Components de Reown */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Manejar Web Components de Reown
            if (typeof window !== 'undefined') {
              console.log('🔧 Configurando Web Components de Reown...');
              
              // Prevenir errores de chunks de SVG
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('ChunkLoadError')) {
                  console.warn('ChunkLoadError detectado, reintentando...');
                  // Reintentar carga después de un delay
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }
              });

              // Manejar errores de WalletConnect
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('Proposal expired')) {
                  console.warn('Proposal expired detectado, limpiando...');
                  // Limpiar propuestas expiradas
                  try {
                    const keys = Object.keys(localStorage);
                    keys.forEach(key => {
                      if (key.includes('wc_') || key.includes('walletconnect')) {
                        localStorage.removeItem(key);
                      }
                    });
                    console.log('✅ Propuestas expiradas limpiadas');
                  } catch (cleanupError) {
                    console.warn('⚠️ Error limpiando propuestas:', cleanupError);
                  }
                }
              });

              // Configurar fallbacks para SVG dinámicos
              if (window.customElements) {
                // Registrar un fallback para iconos de Reown
                class ReownIconFallback extends HTMLElement {
                  constructor() {
                    super();
                    this.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
                  }
                }
                
                if (!customElements.get('reown-icon-fallback')) {
                  customElements.define('reown-icon-fallback', ReownIconFallback);
                }
              }
              
              console.log('✅ Web Components de Reown configurados');
            }
          `,
        }}
      />
    </>
  )
}

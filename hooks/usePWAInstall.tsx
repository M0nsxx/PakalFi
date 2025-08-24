'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode (installed PWA)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        return true
      }
      
      // Check if app is installed via navigator
      if ('getInstalledRelatedApps' in navigator) {
        (navigator as any).getInstalledRelatedApps().then((relatedApps: any[]) => {
          if (relatedApps.length > 0) {
            setIsInstalled(true)
          }
        }).catch(() => {
          // Ignore errors
        })
      }
      
      return false
    }

    // Early check for installed state
    if (checkIfInstalled()) {
      return
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      
      // Track installation
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'App Installed',
          value: 1
        })
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check again after a small delay to ensure all checks are complete
    const timeoutId = setTimeout(checkIfInstalled, 1000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      clearTimeout(timeoutId)
    }
  }, [])

  const installPWA = async () => {
    if (!deferredPrompt) {
      console.log('No deferred prompt available')
      return
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt()
      
      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice
      
      // Track the user's choice
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'pwa_install_prompt', {
          event_category: 'PWA',
          event_label: outcome,
          value: outcome === 'accepted' ? 1 : 0
        })
      }

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        setIsInstallable(false)
        setDeferredPrompt(null)
      } else {
        console.log('User dismissed the install prompt')
      }
    } catch (error) {
      console.error('Error during PWA installation:', error)
    }
  }

  // For iOS devices, show instructions
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  }

  const showIOSInstructions = () => {
    if (isIOS()) {
      alert(
        '🍎 Para instalar esta app en iOS:\n\n' +
        '1. Toca el botón "Compartir" ⤴️\n' +
        '2. Selecciona "Agregar a pantalla de inicio" 📱\n' +
        '3. Toca "Agregar" ✅\n\n' +
        '¡Tu app PakalFi estará lista en tu pantalla de inicio!'
      )
    }
  }

  return {
    isInstallable: isInstallable || isIOS(),
    isInstalled,
    installPWA: isIOS() ? showIOSInstructions : installPWA,
    isIOS: isIOS()
  }
}

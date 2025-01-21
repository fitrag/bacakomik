// components/InstallButton.js
import { useState, useEffect } from 'react'

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e) // Simpan event
      setShowButton(true)    // Tampilkan tombol install
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()  // Tampilkan prompt install
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        setDeferredPrompt(null)  // Reset prompt setelah dipilih
      })
    }
  }

  return (
    showButton && (
      <div className='flex h-screen items-center'>
        <button onClick={handleInstall} className='bg-white border rounded-lg text-dark p-3 w-full'>
          Install App
        </button>
      </div>
    )
  )
}

export default InstallButton

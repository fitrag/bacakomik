// components/InstallButton.js
import { useState, useEffect } from 'react'

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Cek localStorage untuk melihat apakah banner sudah pernah ditutup
    const isBannerClosed = localStorage.getItem('installBannerClosed')
    if (isBannerClosed) {
      setShowButton(false)
      return
    }

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

  const closeBanner = () => {
    setShowButton(false)
    localStorage.setItem('installBannerClosed', 'true') // Simpan status tutup di localStorage
  }

  return (
    showButton && (
      <div className="bg-blue-500 p-4 flex items-center space-x-3 z-50">
        {/* App Icon */}
        <img 
          src="/icon-512x512.png" 
          alt="App Icon" 
          className="w-10 h-10 object-cover rounded-full" 
        />
        
        {/* App Name and Install Button */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">KomikKuntul</p>
          <p className="text-sm text-white">Baca komik online terlengkap</p>
        </div>

        <button 
          onClick={handleInstall} 
          className="bg-white text-blue-500 rounded-lg px-4 py-2 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Install
        </button>

        {/* Icon to close the banner */}
        <button 
          onClick={closeBanner} 
          className="text-white ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  )
}

export default InstallButton

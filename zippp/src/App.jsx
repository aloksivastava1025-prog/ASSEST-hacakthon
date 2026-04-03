import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import FlowModal from './components/FlowModal'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import BusinessOnboarding from './components/BusinessOnboarding'

function App() {
  const [activePrompt, setActivePrompt] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [savedPrompt, setSavedPrompt] = useState(null)
  const [businessData, setBusinessData] = useState(null)

  const handleLogin = () => {
    setSavedPrompt(activePrompt)
    setActivePrompt(null)
    setIsLoggedIn(true)
    setIsOnboarding(true) // Show onboarding right after login
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSavedPrompt(null)
    setIsOnboarding(false)
    setBusinessData(null)
  }

  if (isLoggedIn) {
    if (isOnboarding) {
      return (
        <BusinessOnboarding 
          onComplete={(data) => {
            console.log("Business Data Saved:", data)
            setBusinessData(data)
            setIsOnboarding(false) // proceed to dashboard
          }} 
        />
      )
    }
    return <Dashboard prompt={savedPrompt} businessData={businessData} onLogout={handleLogout} />
  }

  return (
    <div className="app-container">
      <Header />
      <main style={{ flex: 1 }}>
        <Hero onStartFlow={(prompt) => setActivePrompt(prompt)} />
        <Features />
      </main>
      <Footer />
      
      {activePrompt && (
        <FlowModal 
          prompt={activePrompt} 
          onClose={() => setActivePrompt(null)} 
          onLogin={handleLogin}
        />
      )}
    </div>
  )
}

export default App

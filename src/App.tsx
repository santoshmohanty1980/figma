import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

interface User {
  email: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (loginData: { email: string; password: string }) => {
    setUser({ email: loginData.email })
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}

export default App

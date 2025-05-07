import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import useThemeStore from './store/useThemeStore'
function App() {
  const { checkAuth, isCheckingAuth, authUser, onlineUsers } = useAuthStore()

  console.log(onlineUsers)
  const { theme } = useThemeStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <div className="h-[100vh]" data-theme={theme}>
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

export default App

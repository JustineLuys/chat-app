import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { isLoggingIn, login } = useAuthStore()

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters long')

    return true
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) {
      await login(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleToggleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back!</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control space-y-2">
              <label htmlFor="email" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 top-0 z-50 flex items-center pointer-events none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="johndoe@gmail.com"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-control space-y-2">
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 top-0 z-50 flex items-center pointer-events none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="input input-bordered w-full pl-10"
                  placeholder="●●●●●●●●●"
                  onChange={handleChange}
                />

                <button
                  onClick={handleToggleShowPassword}
                  className="absolute cursor-pointer z-50 inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword && (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                  {!showPassword && (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your family"
      />
    </main>
  )
}

export default LoginPage

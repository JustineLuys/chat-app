import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

export const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/'
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({
        authUser: res.data.data,
      })
      get().connectSocket()
    } catch (e) {
      console.error('Error in checkAuth:', e)
      set({
        authUser: null,
      })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data.data })
      toast.success('Sign up successfully')
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },
  logout: async () => {
    try {
      console.log('fuck')
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      toast.success('Log out successfully')
      get().disconnectSocket()
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/login', data)
      set({ authUser: res.data.data })
      toast.success('Logged in successfully')
      get().connectSocket()
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put('/auth/update-profile', data)
      set({ authUser: res.data })
      toast.success('Profile updated successfully')
    } catch (error) {
      console.log('error in update profile:', error)
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  connectSocket: () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
    })
    socket.connect()
    set({ socket: socket })
    socket.on('getOnlineUsers', (onlineUserIds) => {
      set({ onlineUsers: onlineUserIds })
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect()
  },
}))

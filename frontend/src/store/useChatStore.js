import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  areUsersLoading: false,
  areMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ areUsersLoading: true })
      const res = await axiosInstance.get('/users')
      set({ users: res.data.data })
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      set({ areUsersLoading: false })
    }
  },
  getMessages: async (userId) => {
    try {
      set({ areMessagesLoading: true })
      const res = await axiosInstance.get(`/messages/${userId}`)
      set({ messages: res.data.data })
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      set({ areMessagesLoading: false })
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get()
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser.id}`,
        messageData
      )
      set({
        messages: [...messages, res.data.data],
      })
    } catch (e) {
      toast.error(e.response.data.message)
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return
    const socket = useAuthStore.getState().socket
    socket.on('newMessage', (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser.id
      if (!isMessageSentFromSelectedUser) return
      set({ messages: [...get().messages, newMessage] })
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket
    socket.off('newMessage')
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))

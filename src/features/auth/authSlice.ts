import { createSlice } from '@reduxjs/toolkit'

const storedAuth = localStorage.getItem('isAuthenticated') === 'true'
const storedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: storedAuth, user: storedUser },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import studentReducer from '../features/student/studentSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    students: studentReducer,
    auth: authReducer,
  },
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

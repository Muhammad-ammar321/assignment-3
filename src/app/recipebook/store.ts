import recipesReducer from '../../features/recipe/recipeslice';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
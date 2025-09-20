import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  category?: string;
  favorite: boolean;
}

interface RecipesState {
  recipes: Recipe[];
  filterCategory: string;
  searchTerm: string;
}

const initialState: RecipesState = {
  recipes: JSON.parse(localStorage.getItem('recipes') || '[]'),
  filterCategory: '',
  searchTerm: '',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, action: PayloadAction<Omit<Recipe, 'id'>>) {
      const newRecipe = { ...action.payload, id: crypto.randomUUID() };
      state.recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(state.recipes));
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const index = state.recipes.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
        localStorage.setItem('recipes', JSON.stringify(state.recipes));
      }
    },
    deleteRecipe(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter(r => r.id !== action.payload);
      localStorage.setItem('recipes', JSON.stringify(state.recipes));
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const recipe = state.recipes.find(r => r.id === action.payload);
      if (recipe) {
        recipe.favorite = !recipe.favorite;
        localStorage.setItem('recipes', JSON.stringify(state.recipes));
      }
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  setFilterCategory,
  setSearchTerm,
} = recipesSlice.actions;

export default recipesSlice.reducer;
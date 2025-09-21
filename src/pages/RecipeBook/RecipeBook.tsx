import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/recipebook/store';
import {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  setFilterCategory,
  setSearchTerm,
   type Recipe,
} from '../../features/recipe/recipeslice';
import RecipeForm from '../../components/recipebook/RecipeForm/RecipeForm';
import RecipeCard from '../../components/recipebook/RcipeCard/RecipeCard';
import FilterSearch from '../../components/recipebook/filter/filter';
import styles from './RecipeBook.module.css';

const RecipeBook: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, filterCategory, searchTerm } = useSelector((state: RootState) => state.recipes);

  const [isAdding, setIsAdding] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = filterCategory ? recipe.category === filterCategory : true;
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      recipe.name.toLowerCase().includes(lowerSearch) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerSearch));
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (data: Omit<Recipe, 'id' | 'favorite'>) => {
    dispatch(addRecipe({ ...data, favorite: false }));
    setIsAdding(false);
  };

  const handleUpdate = (data: Omit<Recipe, 'id' | 'favorite'>) => {
    if (editingRecipe) {
      dispatch(updateRecipe({ ...data, id: editingRecipe.id, favorite: editingRecipe.favorite }));
      setEditingRecipe(null);
    }
  };

  return (
    
    <div className={styles.homePage}>
      <h1>Recipe Book</h1>

      <FilterSearch
        filterCategory={filterCategory}
        searchTerm={searchTerm}
        onFilterChange={cat => dispatch(setFilterCategory(cat))}
        onSearchChange={term => dispatch(setSearchTerm(term))}
      />

      {!isAdding && !editingRecipe && (
        <button onClick={() => setIsAdding(true)} className={styles.addRecipeBtn}>Add New Recipe</button>
      )}

      {(isAdding || editingRecipe) && (
        <RecipeForm
          initialData={editingRecipe || undefined}
          onSubmit={isAdding ? handleAdd : handleUpdate}
          onCancel={() => {
            setIsAdding(false);
            setEditingRecipe(null);
          }}
        />
      )}

      {filteredRecipes.length === 0 ? (
        <p className={styles.noRecipesMsg}>No recipes found. Please add some!</p>
      ) : (
        <div className={styles.recipeGrid}>
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={r => setEditingRecipe(r)}
              onDelete={id => dispatch(deleteRecipe(id))}
              onToggleFavorite={id => dispatch(toggleFavorite(id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeBook;
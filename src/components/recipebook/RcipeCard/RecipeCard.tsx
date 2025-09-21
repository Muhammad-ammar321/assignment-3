import React from 'react';
import { type Recipe } from '../../../features/recipe/recipeslice';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className={styles.recipeCard}>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} className={styles.recipeImage} />}
      <h3>{recipe.name}</h3>
      <p><strong>Category:</strong> {recipe.category || 'N/A'}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.instructions}</p>
      <div className={styles.cardButtons}>
        <button className={styles.button} onClick={() => onEdit(recipe)}>Edit</button>
        <button
          className={styles.button}
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this recipe?')) {
              onDelete(recipe.id);
            }
          }}
        >
          Delete
        </button>
        <button className={styles.button} onClick={() => onToggleFavorite(recipe.id)}>
          {recipe.favorite ? '★ Favorite' : '☆ Mark Favorite'}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
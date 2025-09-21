import React, { useState } from 'react';
import { type Recipe } from '../../../features/recipe/recipeslice';
import styles from './RecipeForm.module.css';

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: Omit<Recipe, 'id' | 'favorite'>) => void;
  onCancel: () => void;
}

const categories = ['Dessert', 'Main Course', 'Snack', 'Appetizer', 'Beverage'];

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients.join(', ') || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [category, setCategory] = useState(initialData?.category || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit({
      name: name.trim(),
      ingredients: ingredients.split(',').map(i => i.trim()).filter(i => i),
      instructions: instructions.trim(),
      imageUrl: imageUrl.trim() || undefined,
      category: category || undefined,
    });
  };

  return (

    <form onSubmit={handleSubmit} className={styles.recipeForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Recipe Name*:</label>
        <input
          className={styles.input}
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Ingredients* (comma separated):</label>
        <textarea
          className={styles.input}
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Cooking Instructions*:</label>
        <textarea
          className={styles.textarea}
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Image URL:</label>
        <input
          className={styles.input}
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Category:</label>
        <select
          className={styles.select}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className={styles.formButtons}>
        <button type="submit" className={styles.button}>Save</button>
        <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancelBtn}`}>Cancel</button>
      </div>
    </form>
  );
};

export default RecipeForm;
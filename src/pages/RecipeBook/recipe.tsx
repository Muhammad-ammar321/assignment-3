import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/recipebook/store';
import RecipeBook from './RecipeBook';

const Recipe: React.FC = () => {
  return (
    <Provider store={store}>
      <RecipeBook />
    </Provider>
  );
};

export default Recipe;
// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import favoriteCharactersReducer from '../features/favoriteCharacters/favoriteCharactersSlice';

export const store = configureStore({
  reducer: {
    favoriteCharacters: favoriteCharactersReducer,
  },
});

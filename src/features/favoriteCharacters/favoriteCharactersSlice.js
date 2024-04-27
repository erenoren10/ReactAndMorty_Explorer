import { createSlice } from '@reduxjs/toolkit';

export const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState: [],
  reducers: {
    addFavoriteCharacter: (state, action) => {
      state.push(action.payload);
    },
    removeFavoriteCharacter: (state, action) => {
      return state.filter(character => character.id !== action.payload.id);
    },
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter } = favoriteCharactersSlice.actions;

export default favoriteCharactersSlice.reducer;

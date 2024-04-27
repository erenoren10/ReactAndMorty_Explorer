import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import { addFavoriteCharacter, removeFavoriteCharacter } from '../features/favoriteCharacters/favoriteCharactersSlice';

function FavoritesPage() {
  const favoriteCharacters = useSelector(state => state.favoriteCharacters);
  const dispatch = useDispatch();

  const handleFavoriteToggle = (character) => {
    if (isFavorite(character)) {
      dispatch(removeFavoriteCharacter(character));
    } else {
      if (favoriteCharacters.length >= 10) {
        alert("Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.");
      } else {
        dispatch(addFavoriteCharacter(character));
      }
    }
  };

  const isFavorite = (character) => {
    return favoriteCharacters.some(favorite => favorite.id === character.id);
  };

  const handleRemoveFavorite = (character) => {
    const confirmation = window.confirm(`${character.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`);
    if (confirmation) {
      dispatch(removeFavoriteCharacter(character));
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="search-container">
          <li className='link'><Link to="/">Ana Sayfa</Link></li>
          <li className='link'><Link to="/favorites">Favoriler</Link></li>
        </div>
      </nav>
      <h1 className='favorite-head'>Favori Karakterler</h1>
      <ul>
        <div className='favorite-character-grid'>
          {favoriteCharacters.map(character => (
            <div className="favorite-character-info" key={character.id}>
              <div className='favorite-character-header'>
                <h2>Seçilen Karakter: {character.name}</h2>
                <button className="favorite-button" onClick={() => handleRemoveFavorite(character)}>
                  {'❤️'}
                </button>
               
              </div>
              <img src={character.image} alt={character.name} />
              <p>Durum: {character.status}</p>
              <p>Tür: {character.species}</p>
              <p>Cinsiyet: {character.gender}</p>    
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default FavoritesPage;

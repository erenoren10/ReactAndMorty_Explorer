import React, { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from './components/Pagination';
import { addFavoriteCharacter, removeFavoriteCharacter } from './features/favoriteCharacters/favoriteCharactersSlice';

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const favoriteCharacters = useSelector(state => state.favoriteCharacters);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      let allEpisodes = [];
      let nextPage = `https://rickandmortyapi.com/api/episode`;

      while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allEpisodes = [...allEpisodes, ...data.results];
        nextPage = data.info.next;
      }

      setEpisodes(allEpisodes);
      setFilteredEpisodes(allEpisodes);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    const filteredEpisodes = episodes.filter(episode =>
      episode.name.toLowerCase().includes(term.toLowerCase()) ||
      episode.episode.toLowerCase().includes(term.toLowerCase()) ||
      episode.air_date.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEpisodes(filteredEpisodes);
  };

  const currentEpisode = filteredEpisodes.find((episode, index) => index === currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchCharacterDetails = async (characterUrl) => {
    try {
      const response = await fetch(characterUrl);
      const data = await response.json();
      setSelectedCharacter(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  const resetSelectedCharacter = () => {
    setSelectedCharacter(null);
  };

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

  return (
    <div>
      <nav className="navbar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Bölüm ara..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <ul>
            <li className='link'><Link to="/">Ana Sayfa</Link></li>
            <li className='link' ><Link to="/favorites">Favoriler</Link></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <h1 className='bolumbaslik'>Bölümler</h1>
        <Pagination
          episodesPerPage={1}
          totalEpisodes={filteredEpisodes.length}
          paginate={paginate}
          filteredEpisodes
        />
        <div className='content'>
          <div className="episode-details">
            {currentEpisode && (
              <div className="episode-info">
                <h1>{currentEpisode.name}</h1>
                <h3>Karakterler:</h3>
                <ul>
                  {currentEpisode.characters.map((characterUrl, index) => (
                    <li key={index}>
                      <button onClick={() => fetchCharacterDetails(characterUrl)}>
                        Karakter {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="character-details">
            {selectedCharacter && (
              <div className="character-info">
                <div className='selected-character-header'>
                <h2>Seçilen Karakter: {selectedCharacter.name}</h2>
                <button className="favorite-button" onClick={() => handleFavoriteToggle(selectedCharacter)}>
                  {isFavorite(selectedCharacter) ? '❤️' : '🤍'}
                </button>
                </div>
                <img src={selectedCharacter.image} alt={selectedCharacter.name} />
                <p>Durum: {selectedCharacter.status}</p>
                <p>Tür: {selectedCharacter.species}</p>
                <p>Cinsiyet: {selectedCharacter.gender}</p>
                <button onClick={resetSelectedCharacter}>Geri Dön</button>
               
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeList;

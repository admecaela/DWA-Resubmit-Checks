import React, { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

//FavoritesList component displays a list of user's favorite episodes
const FavoritesList = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [filterText, setFilterText] = useState('');

  const sortFavorites = (favorites) => {
    return favorites.sort((a, b) => {
      if (sortOrder === 'A-Z') return a.title.localeCompare(b.title);
      if (sortOrder === 'Z-A') return b.title.localeCompare(a.title);
      if (sortOrder === 'Date Ascending') return new Date(a.addedAt) - new Date(b.addedAt);
      if (sortOrder === 'Date Descending') return new Date(b.addedAt) - new Date(a.addedAt);
      return 0;
    });
  };

  const filteredFavorites = favorites.filter(favorite =>
    favorite.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedFavorites = sortFavorites(filteredFavorites);

  const groupedFavorites = sortedFavorites.reduce((acc, episode) => {
    const key = `${episode.showId}-${episode.seasonId}`;
    if (!acc[key]) {
      acc[key] = { showId: episode.showId, seasonId: episode.seasonId, episodes: [] };
    }
    acc[key].episodes.push(episode);
    return acc;
  }, {});

  return (
    <div>
      <h2>My Favorites</h2>
      <div>
        <input
          type="text"
          placeholder="Filter by title"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="A-Z">Title: A-Z</option>
          <option value="Z-A">Title: Z-A</option>
          <option value="Date Ascending">Date Added: Ascending</option>
          <option value="Date Descending">Date Added: Descending</option>
        </select>
      </div>
      {Object.values(groupedFavorites).map(group => (
        <div key={group.seasonId}>
          <h3>Show: {group.showId} | Season: {group.seasonId}</h3>
          {group.episodes.map(episode => (
            <div key={episode.id}>
              <h4>{episode.title}</h4>
              <p>Added At: {new Date(episode.addedAt).toLocaleString()}</p>
              <button onClick={() => removeFavorite(episode.id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

//ShareFavorites component generates a shareable link for the user's favorites
const ShareFavorites = () => {
  const { favorites } = useFavorites();

//Function to generate a shareable like based on the user's ID
  const generateShareableLink = () => {
    const userId = supabase.auth.user().id;
    return `https://yourapp.com/favorites/${userId}`;
  };

  return (
    <div>
      <h2>Share Your Favorites</h2>
      <a href={generateShareableLink()} target="_blank" rel="noopener noreferrer">Share this link</a>
    </div>
  );
};

export default ShareFavorites;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

//Initialize Supabase client
const supabase = createClient('https://your-project-url.supabase.co', 'your-public-anon-key');
const FavoritesContext = createContext();

//Custom hook to use the Favourites context
export const useFavorites = () => useContext(FavoritesContext);

//FavoritesProvider component manages the user's favourite episodes
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

//Fetch the user'e favorites from the Supabase database when the componnt mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      const { data } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', supabase.auth.user().id); //Fetch only the logged-in user's favorites
      
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

//Function to add an episode to the user's favorites
  const addFavorite = async (episode) => {
    const { data } = await supabase
     .from('favorites')
     .insert([{ episode_id: episode.id, user_id: supabase.auth.user().id }]);

    setFavorites([...favorites, data[0]]); //Update the local favorites state
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
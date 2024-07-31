import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSeason } from '../services/api';
import Player from './Player';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';


//EpisodeList component displays a list of episodes for a specific season
const EpisodeList = ({ episodes }) => {
  const { id } = useParams();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const { addFavorite } = useFavorites();
  const { playEpisode } = useAudioPlayer();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchSeason(id);
      setSeason(data);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!season) return <div>Season not found</div>;

  return (
    <div>
      <Link to={`/shows/${season.showId}`}>Back to Show</Link>
      <h2>{season.title}</h2>
      {season.episodes.map(episode => (
        <div key={episode.id}>
          <h3>{episode.title}</h3>
          <Player src={episode.audioUrl} />
          <button onClick={() => addFavorite(episode)}>Add to Favorites</button>
          <button onClick={() => playEpisode(episode)}>Play</button>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
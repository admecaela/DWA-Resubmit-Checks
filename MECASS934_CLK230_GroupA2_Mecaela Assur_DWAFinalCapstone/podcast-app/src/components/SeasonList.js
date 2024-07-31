import React from 'react';
import { Link } from 'react-router-dom';

//SeasonList component displays a list of seasons for a specific show
const SeasonList = ({ seasons, selectedSeason, onSelectSeason }) => (
  <div>
    {seasons.sort((a, b) => a.season - b.season).map(season => (
      <div key={season.id} onClick={() => onSelectSeason(season.season)}>
        <img src={season.image} alt={season.title} />
        <h3>{season.title}</h3>
        <p> Number of Episodes: {season.episodes.length}</p>
        {selectedSeason === season.season && <Link to={`/seasons/${season.id}`}>View Episodes</Link>}
      </div>
    ))}
  </div>
);

export default SeasonList;
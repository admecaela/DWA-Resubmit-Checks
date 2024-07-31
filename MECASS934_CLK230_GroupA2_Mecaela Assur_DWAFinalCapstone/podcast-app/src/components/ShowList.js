import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
//import { useParams } from 'react-router-dom';
import { fetchShow } from '../services/api';
//import SeasonList from './SeasonList';
//import EpisodeList from './EpisodeList';

const genres = [
  'Personal Growth',
  'True Crime and Investigative Journalism',
  'History',
  'Comedy',
  'Entertainment',
  'Business',
  'Fiction',
  'News',
  'Kids and Family'
];

//ShowList component displays a list of shows with sorting and filtering options
const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [filterText, setFilterText] = useState('');
  const [filteredGenre, setFilteredGenre] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchShows();
      setShows(data);
      setLoading(false);
    };
    getData();
  }, []);

  const fuse = new Fuse(shows, {
    keys: ['title'],
    threshold: 0.3, // adjust this value for fuzzy matching sensitivity
  });

  const filterShowsByGenre = (shows) => {
    if (!filteredGenre) return shows;
    return shows.filter(show => show.genre.includes(filteredGenre));
  };

  const sortShows = (shows) => {
    return shows.sort((a, b) => {
      if (sortOrder === 'A-Z') return a.title.localeCompare(b.title);
      if (sortOrder === 'Z-A') return b.title.localeCompare(a.title);
      if (sortOrder === 'Date Ascending') return new Date(a.updatedAt) - new Date(b.updatedAt);
      if (sortOrder === 'Date Descending') return new Date(b.updatedAt) - new Date(a.updatedAt);
      return 0;
    });
  };

  const filteredShows = filterShowsByGenre(
    filterText ? fuse.search(filterText).map(result => result.item) : shows
  );

  const sortedShows = sortShows(filteredShows);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
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
          <option value="Date Ascending">Date Updated: Ascending</option>
          <option value="Date Descending">Date Updated: Descending</option>
        </select>
        <div>
          {genres.map((genre, index) => (
            <button key={index} onClick={() => setFilteredGenre(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => setFilteredGenre(null)}>Clear Genre Filter</button>
        </div>
      </div>
      {sortedShows.map(show => (
        <div key={show.id}>
          <h2>{show.title}</h2>
          <p>{show.description}</p>
          <p>Genres: {show.genre.join(', ')}</p>
          <p>Last Updated: {new Date(show.updatedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
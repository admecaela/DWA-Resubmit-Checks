// src/components/AllShowsList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPreviews } from '../services/api';


//AllShowList component displays a list of all podcast shows
const AllShowsList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchPreviews();
      setShows(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {shows.map(show => (
        <div key={show.id}>
          <Link to={`/shows/${show.id}`}>
            <h3>{show.title}</h3>
          </Link>
          <p>{show.genre.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default AllShowsList;
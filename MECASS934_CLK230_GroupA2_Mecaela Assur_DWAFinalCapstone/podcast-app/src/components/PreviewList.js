import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPreviews } from '../services/api';

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

//PreviewList component displays a list of previews for shows
const PreviewList = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchPreviews();
      setPreviews(data); // Set the single show data as an array
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {previews.map(preview => (
        <div key={preview.id}>
          <Link to={`/shows/${preview.id}`}>
            <img src={preview.image} alt={preview.title} />
            <h2>{preview.title}</h2>
          </Link>
          <p>{preview.description}</p>
          <p>Genres: {preview.genre.map(id => genres[id - 1]).join(', ')}</p>
          <p>Number of Seasons: {preview.seasons.length}</p>
        </div>
      ))}
    </div>
  );
};

export default PreviewList;
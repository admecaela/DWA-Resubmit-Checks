import React from 'react';
import PreviewList from '../components/PreviewList';

//Home component displays a list of all available podcast shows
const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch all shows when the component mounts
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setLoading(false); //Set loading to false once data is fetched
      });
  }, []);

  return (
    <div>
      <h1>All Shows</h1>
      {loading ? (
        <p>Loading...</p> //Display loading state while data is being fetched
      ) : (
        <ul>
          {shows.map(show => (
            <li key={show.id}>
              <Link to={`/shows/${show.id}`}>
                <img src={show.previewImage} alt={show.title} />
                <h2>{show.title}</h2>
                <p>{show.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
import React from 'react';
import { Link, useParams } from 'react-router-dom';

//Show component displays details of a specific show and its seasons
const Show = () => {
  const { showId } = useParams(); //Get showId from the URL
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch data for the specific show when the component mounts
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/shows/${showId}`)
      .then(response => response.json())
      .then(data => {
        setShow(data);
        setLoading(false); //Set loading to false once data is fetched
      });
  }, [showId]);

  return (
    <div>
      <Link to="/">Back to All Shows</Link> {/* Link to go back to the home page */}
      {loading ? (
        <p>Loading...</p> //Display loading state while data is being fetched
      ) : (
        <div>
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <ul>
            {show.seasons.map(season => (
              <li key={season.season}>
                <Link to={`/shows/${showId}/seasons/${season.season}`}>
                  <h3>{season.title}</h3>
                  <p>{season.episodes.length} episodes</p> {/* Display number of episodes in the season */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Show;
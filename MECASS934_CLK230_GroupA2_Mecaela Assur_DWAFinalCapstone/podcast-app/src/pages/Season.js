import React from 'react';
import EpisodeList from '../components/EpisodeList';

//Season component displays episodes for a specific season
const Season = () => {
  const { showId, seasonNumber } = useParams(); //Get showId and seasonNumber from the URL
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch data for the specific season when the component mounts
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/shows/${showId}/seasons/${seasonNumber}`)
      .then(response => response.json())
      .then(data => {
        setSeason(data);
        setLoading(false); //Set loading to false once data is fetched
      });
  }, [showId, seasonNumber]);

  return (
    <div>
      <Link to={`/shows/${showId}`}>Back to Show</Link> {/* Link to go back to the show page */}
      {loading ? (
        <p>Loading...</p> //Display loading state while data is being fetched
      ) : (
        <div>
          <h1>{season.title}</h1>
          <ul>
            {season.episodes.map(episode => (
              <li key={episode.id}>
                <h3>{episode.title}</h3>
                <audio controls src={episode.audioUrl}></audio> {/* Audio player for the episode */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Season;
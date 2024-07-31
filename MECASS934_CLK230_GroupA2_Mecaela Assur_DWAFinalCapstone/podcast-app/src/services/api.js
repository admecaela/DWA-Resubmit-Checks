//Base URL for the podcast API
const API_BASE_URL = 'https://podcast-api.netlify.app';

/**
 * Fetch all shows from the API.
 * @returns {Promise<Array>} A promise that resolves to the list of all shows.
 */
export const fetchAllShows = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error('Failed to fetch shows');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    return [];
  }
};

/**
 * Fetch a specific show by its ID.
 * @param {string} showId - The ID of the show to fetch.
 * @returns {Promise<Object>} A promise that resolves to the show data.
 */
export const fetchShowById = async (showId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows/${showId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch show');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching show:', error);
    return null;
  }
};

/**
 * Fetch a specific season of a show by show ID and season number.
 * @param {string} showId - The ID of the show.
 * @param {number} seasonNumber - The number of the season to fetch.
 * @returns {Promise<Object>} A promise that resolves to the season data.
 */
export const fetchSeasonByShowAndNumber = async (showId, seasonNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows/${showId}/seasons/${seasonNumber}`);
    if (!response.ok) {
      throw new Error('Failed to fetch season');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching season:', error);
    return null;
  }
};
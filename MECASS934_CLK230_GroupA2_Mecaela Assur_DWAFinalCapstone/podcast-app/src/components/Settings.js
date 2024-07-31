import React from 'react';

//Settings component allows users to reset their listening history
const Settings = () => {
//Function to reset the user's listening history by clearing localStorage
  const resetProgress = () => {
    localStorage.removeItem('lastPlayedEpisode');
    localStorage.removeItem('lastTimestamp');
    localStorage.removeItem('completedEpisodes');
    alert('Your listening history has been reset.');
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={resetProgress}>Reset Listening History</button>
    </div>
  );
};

export default Settings;
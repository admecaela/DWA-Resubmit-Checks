import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();

//Custom hook to use the AudioPlayer ontext
export const useAudioPlayer = () => useContext(AudioPlayerContext);

//AudioPlayerProvider component manages the audio playback and progress tracking
export const AudioPlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

//Load last played episode and timestamp from localStaorage when component mounts
  useEffect(() => {
    const savedEpisode = JSON.parse(localStorage.getItem('lastPlayedEpisode'));
    if (savedEpisode) {
      setCurrentEpisode(savedEpisode);
      const lastTimestamp = localStorage.getItem('lastTimestamp');
      if (lastTimestamp) {
        audioRef.current.currentTime = lastTimestamp;
    }
  }

  const completedEpisodes = JSON.parse(localStorage.getItem('completedEpisodes')) || [];

  const audio = audioRef.current;

//Update progress and check if episode is completed
  const updateProgress = () => {
    setProgress((audio.currentTime / audio.duration) * 100);
    localStorage.setItem('lastTimestamp', audio.currentTime);
    
//Mark episode as completed if within 10 seconds of the end
    if (audio.currentTime >= audio.duration - 10) {
      if (!completedEpisodes.includes(currentEpisode.id)) {
        completedEpisodes.push(currentEpisode.id);
        localStorage.setItem('completedEpisodes', JSON.stringify(completedEpisodes));
      }
    }
  };
  
  audio.addEventListener('timeupdate', updateProgress);
  
  return () => {
    audio.removeEventListener('timeupdate', updateProgress);
  };
}, [currentEpisode]);
  
//Function to play a selected episode
const playEpisode = (episode) => {
  setCurrentEpisode(episode);
  setIsPlaying(true);
  localStorage.setItem('lastPlayedEpisode', JSON.stringify(episode));
  audioRef.current.src = episode.audioUrl;
  audioRef.current.play();
};
  
//Function to toggle play/pause state
const togglePlayPause = () => {
  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }
  setIsPlaying(!isPlaying);
};
  
return (
  <AudioPlayerContext.Provider value={{ currentEpisode, playEpisode, togglePlayPause, isPlaying, progress }}>
    {children}
    {currentEpisode && (
      <div className="audio-player">
        <h4>Now Playing: {currentEpisode.title}</h4>
          <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <div>
            <span>{(audioRef.current.currentTime / 60).toFixed(2)}</span> / <span>{(audioRef.current.duration / 60).toFixed(2)}</span>
          </div>
          <progress value={progress} max="100"></progress>
        </div>
      )}
    </AudioPlayerContext.Provider>
  );
};
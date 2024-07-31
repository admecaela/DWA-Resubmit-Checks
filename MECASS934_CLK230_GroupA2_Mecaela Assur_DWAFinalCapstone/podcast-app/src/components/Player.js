import React, { useEffect, useRef } from 'react';

//Player component displays the audio player with controls and progress tracking
const Player = ({ audioUrl, episodeTitle, onTimeUpdate }) => {
  const audioRef = useRef(null);

  //Handle time updates to track progress
  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      onTimeUpdate(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  return (
    <div>
      <h3>Now Playing: {episodeTitle}</h3>
      <audio ref={audioRef} controls src={audioUrl}></audio> {/* Audio player */}
    </div>
  );
};

export default Player;
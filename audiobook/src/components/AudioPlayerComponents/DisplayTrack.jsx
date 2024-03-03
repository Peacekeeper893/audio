import React from "react";
import { useEffect } from "react";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  book,
  chapter_number,
  isPlaying,
  setIsPlaying,
}) => {



  const art = [{
     src: book[0]["bookimg"] , sizes: '128x128', type: 'image/png' 
  }] 



  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const updateMetadata = () => {
    let track =  book[0];

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track["chapters"][parseInt(chapter_number-1)]["chapter_title"],
      artist: track["name"],
      artwork:art,
    });
  
    // Media is loaded, set the duration.
    updatePositionState();
  }
  
  /* Position state (supported since Chrome 81) */
  
  function updatePositionState() {
    if ('setPositionState' in navigator.mediaSession) {
      navigator.mediaSession.setPositionState({
        duration: audioRef.duration,
        playbackRate: audioRef.playbackRate,
        position: audioRef.currentTime
      });
    }
  }




  const onLoadedData = () => {
    setIsPlaying(true);
    audioRef.current.play().then(_ => updateMetadata())
    .catch(error => console.log(error));
  }

  return (
    <div className="">
      <audio
        className="w-full"
        // preload="auto"
        id="audio-el"
        type = "audio/mpeg"
        src={currentTrack}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onLoadedData={onLoadedData}
      ></audio>
    </div>
  );
};

export default DisplayTrack;

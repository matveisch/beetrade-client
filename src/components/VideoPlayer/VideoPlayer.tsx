import { useEffect, useRef, useState } from 'react';
import classes from './VideoPlayer.module.scss';
import playButton from '../../assets/images/playButton.svg';
import videoThumbnail from '../../assets/images/videoThumbnail.svg';
import { useAppSelector } from '../../hooks';
import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';

function VideoPlayer() {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const currentVideoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = useAppSelector(selectCurrentVideo);

  useEffect(() => {
    setVideoIsPlaying(false);
    currentVideoRef.current?.load();
  }, [currentVideo]);

  return (
    <div className={classes.videoContainer}>
      <video
        className={classes.video}
        controls={videoIsPlaying}
        poster={videoThumbnail}
        ref={currentVideoRef}
        onClick={() => {
          setVideoIsPlaying(true);
        }}>
        <source src={currentVideo?.path} type="video/mp4" />
      </video>
      {!videoIsPlaying && (
        <button
          type="button"
          onClick={() => {
            currentVideoRef.current?.play();
            setVideoIsPlaying(true);
          }}>
          <img src={playButton} alt="play button" />
        </button>
      )}
      <div className={classes.videoShadow} />
    </div>
  );
}

export default VideoPlayer;

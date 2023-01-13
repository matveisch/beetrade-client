import { useRef, useState } from 'react';
import classes from './VideoPlayer.module.scss';
import playButton from '../../assets/images/playButton.svg';
import videoThumbnail from '../../assets/images/videoThumbnail.svg';

interface VideoPlayerProps {
  videoPath: string;
}

function VideoPlayer({ videoPath }: VideoPlayerProps) {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const currentVideo = useRef<HTMLVideoElement>(null);

  return (
    <div className={classes.videoContainer}>
      <video
        className={classes.video}
        controls={videoIsPlaying}
        poster={videoThumbnail}
        ref={currentVideo}
        onClick={() => {
          setVideoIsPlaying(true);
        }}>
        <source src={videoPath} type="video/mp4" />
      </video>
      {!videoIsPlaying && (
        <button
          type="button"
          onClick={() => {
            currentVideo.current?.play();
            setVideoIsPlaying(true);
          }}>
          <img src={playButton} alt="play button" />
        </button>
      )}
    </div>
  );
}

export default VideoPlayer;

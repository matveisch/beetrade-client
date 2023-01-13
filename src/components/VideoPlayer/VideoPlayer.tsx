import classes from './VideoPlayer.module.scss';
import playButton from '../../assets/images/playButton.svg';
import videoThumbnail from '../../assets/images/videoThumbnail.svg';
import { useRef, useState } from 'react';

interface VideoPlayerProps {
  videoPath: string;
}

export function VideoPlayer({ videoPath }: VideoPlayerProps) {
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
        Sorry, your browser doesn't support videos.
      </video>
      {!videoIsPlaying && (
        <img
          src={playButton}
          alt="play button"
          onClick={() => {
            currentVideo.current?.play();
            setVideoIsPlaying(true);
          }}
        />
      )}
    </div>
  );
}

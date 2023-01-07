import classes from "./VideoPlayer.module.scss";
import video from "../../assets/videos/pexels-mart-production-8471384.mp4";
import playButton from "../../assets/images/playButton.svg";
import videoThumbnail from "../../assets/images/videoThumbnail.svg";
import { useEffect, useRef, useState } from "react";

export function VideoPlayer() {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const currentVideo = useRef<HTMLVideoElement>(null);

  return (
    <div className={classes.videoContainer}>
      <video
        className={classes.video}
        controls
        poster={videoThumbnail}
        ref={currentVideo}
        onClick={() => {
          setVideoIsPlaying(!videoIsPlaying);
        }}
      >
        <source src={video} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
      {!videoIsPlaying && (
        <img
          src={playButton}
          alt="play button"
          onClick={() => {
            currentVideo.current?.play();
            setVideoIsPlaying(!videoIsPlaying);
          }}
        />
      )}
    </div>
  );
}

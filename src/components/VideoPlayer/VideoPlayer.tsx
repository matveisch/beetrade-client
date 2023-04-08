import { useEffect, useRef, useState } from 'react';
import classes from './VideoPlayer.module.scss';
import playButton from '../../assets/images/playButton.svg';
import videoThumbnail from '../../assets/images/videoThumbnail.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { setGlobalError } from '../../features/globalError/globalErrorSlice';

function VideoPlayer() {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVideoIsPlaying(false);
    currentVideoRef.current?.load();
  }, [currentVideo]);

  async function getVideoSrc() {
    try {
      // todo: replace video url one there will be more videos
      const response = await fetch(`${import.meta.env.VITE_API}/videos/123`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setVideoSrc(data);
    } catch (error) {
      dispatch(setGlobalError('there was a problem downloading video'));
    }
  }

  useEffect(() => {
    getVideoSrc();
  }, []);

  return (
    <div className={classes.videoContainer}>
      <video
        className={classes.video}
        controls={videoIsPlaying}
        controlsList="nodownload"
        poster={videoThumbnail}
        playsInline
        ref={currentVideoRef}
        // src="https://d1trlqnyyov9mm.cloudfront.net/pexels-mart-production-8471384.mp4"
        src={videoSrc}
        onClick={() => {
          setVideoIsPlaying(true);
        }}>
        <source
          // src={`${import.meta.env.VITE_API}/videos/${currentVideo?._id}?auth_token=${localStorage.getItem('token')}`}
          type="video/mp4"
        />
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

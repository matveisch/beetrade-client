import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { VideoType } from '../../interface/types';
import Contents from '../../components/Contents/Contents';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectVideos, setVideos } from '../../features/videos/videosSlice';
import { selectCurrentVideo, setCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { selectCurrentSection, setCurrentSection } from '../../features/currentSection/currentSectionSlice';
import { setUserSession } from '../../features/userSession/userSessionSlice';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const videos = useAppSelector(selectVideos);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const currentSection = useAppSelector(selectCurrentSection);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUserSession(undefined));
    navigate('/signin');
  }

  async function getVideos() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/videos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 401) handleSignOut();

      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVideos().then(data => {
      dispatch(setVideos(data));

      const video = getFirstUnseenVideo(data);
      dispatch(setCurrentVideo(video));
      dispatch(setCurrentSection(video.section));
    });
  }, []);

  // todo: error handling
  if (!videos || !currentVideo || !currentSection) return <div>error</div>;

  return (
    <div className={classes.currentVideo}>
      <div className={classes.videoPlayerContainer}>
        <VideoPlayer />
        <Contents />
      </div>
      <Sidebar
        currentSectionVideos={videos.filter(video => video.section._id === currentSection._id)}
        videos={videos}
      />
    </div>
  );
}

export default CurrentVideo;

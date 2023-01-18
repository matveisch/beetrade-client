import { useEffect } from 'react';
import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Sidebar from '../Sidebar/Sidebar';
import { mockVideos } from '../../assets/data/mockData';
import { VideoType } from '../../interface/types';
import Contents from '../Contents/Contents';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectVideos, setVideos } from '../../features/videos/videosSlice';
import { selectCurrentVideo, setCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { selectCurrentSection, setCurrentSection } from '../../features/currentSection/currentSectionSlice';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const videos = useAppSelector(selectVideos);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const currentSection = useAppSelector(selectCurrentSection);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setVideos(mockVideos));
  }, []);

  useEffect(() => {
    if (videos) {
      const video = getFirstUnseenVideo(videos);
      dispatch(setCurrentVideo(video));
      dispatch(setCurrentSection(video.section));
    }
  }, [videos]);

  // todo: error handling
  if (!videos || !currentVideo || !currentSection) return <div>error</div>;

  return (
    <div className={classes.currentVideo}>
      <div className={classes.videoPlayerContainer}>
        <VideoPlayer />
        <Contents />
      </div>
      <Sidebar currentSectionVideos={videos.filter(video => video.section === currentSection)} videos={videos} />
    </div>
  );
}

export default CurrentVideo;

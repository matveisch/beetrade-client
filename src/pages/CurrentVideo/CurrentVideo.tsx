import { useEffect, useState } from 'react';

import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { VideoType } from '../../interface/types';
import Contents from '../../components/Contents/Contents';
import { useAppSelector } from '../../hooks';
import { selectVideos } from '../../features/videos/videosSlice';
import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { selectCurrentSection } from '../../features/currentSection/currentSectionSlice';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos?.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const videos = useAppSelector(selectVideos);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const currentSection = useAppSelector(selectCurrentSection);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState<'contents' | 'sidebar'>('contents');

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  // todo: error handling
  if (!videos || !currentVideo || !currentSection) return <div>error</div>;

  return windowWidth > 768 ? (
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
  ) : (
    <div className={classes.currentVideoMobile}>
      <VideoPlayer />
      <div className={classes.swiper}>
        <div className={classes.buttons}>
          <button type="button" onClick={() => setCurrentView('contents')}>
            Contents
            <div
              className={classes.afterElement}
              style={currentView !== 'contents' ? { display: 'none' } : undefined}
            />
          </button>
          <button type="button" onClick={() => setCurrentView('sidebar')}>
            Sidebar
            <div className={classes.afterElement} style={currentView !== 'sidebar' ? { display: 'none' } : undefined} />
          </button>
        </div>
      </div>
      {currentView === 'contents' && <Contents />}
      {currentView === 'sidebar' && (
        <Sidebar
          currentSectionVideos={videos.filter(video => video.section._id === currentSection._id)}
          videos={videos}
        />
      )}
    </div>
  );
}

export default CurrentVideo;

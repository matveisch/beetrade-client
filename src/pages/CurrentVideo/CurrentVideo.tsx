import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { VideoType } from '../../interface/types';
import Contents from '../../components/Contents/Contents';
import { useAppSelector } from '../../hooks';
import { selectVideos } from '../../features/videos/videosSlice';
import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { selectCurrentSection } from '../../features/currentSection/currentSectionSlice';
import Description from '../../components/Contents/Description/Description';
import SectionsGrid from '../../components/Contents/SectionsGrid/SectionsGrid';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos?.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const videos = useAppSelector(selectVideos);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const currentSection = useAppSelector(selectCurrentSection);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState<'sections' | 'sidebar' | 'description'>('sidebar');

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  if (!videos || !currentVideo || !currentSection)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100% - 120px)',
          alignItems: 'center',
        }}>
        <ColorRing
          visible
          height="300"
          width="300"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
          colors={['#fc9a37', '#fc9a37', '#fc9a37', '#fc9a37', '#fc9a37']}
        />
      </div>
    );

  return windowWidth > 768 ? (
    <div className={classes.currentVideo}>
      <Sidebar
        currentSectionVideos={videos.filter(video => video.section._id === currentSection._id)}
        videos={videos}
      />
      <div className={classes.videoPlayerContainer}>
        <VideoPlayer />
        <Contents />
      </div>
    </div>
  ) : (
    <div className={classes.currentVideoMobile}>
      <VideoPlayer />
      <div className={classes.swiper}>
        <div className={classes.buttons}>
          <button type="button" onClick={() => setCurrentView('sidebar')}>
            Sidebar
            <div className={classes.afterElement} style={currentView !== 'sidebar' ? { display: 'none' } : undefined} />
          </button>
          <button type="button" onClick={() => setCurrentView('description')}>
            Description
            <div
              className={classes.afterElement}
              style={currentView !== 'description' ? { display: 'none' } : undefined}
            />
          </button>
          <button type="button" onClick={() => setCurrentView('sections')}>
            Sections
            <div
              className={classes.afterElement}
              style={currentView !== 'sections' ? { display: 'none' } : undefined}
            />
          </button>
        </div>
      </div>
      {currentView === 'sections' && <SectionsGrid />}
      {currentView === 'description' && <Description body={currentVideo.description} />}
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

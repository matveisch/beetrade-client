import { useEffect, useState } from 'react';
import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Sidebar } from '../Sidebar/Sidebar';
import { mockSections, mockVideos } from '../../assets/data/mockData';
import { SectionType, VideoType } from '../../interface/types';
import SidebarContext, { SidebarContextType } from '../../context/SidebarContext';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const [videos, setVideos] = useState<VideoType[]>();
  const [currentVideo, setCurrentVideo] = useState<VideoType>();
  const [currentSection, setCurrentSection] = useState<SectionType>();

  useEffect(() => {
    setVideos(mockVideos);
  }, []);

  useEffect(() => {
    if (videos) {
      const video = getFirstUnseenVideo(videos);
      setCurrentVideo(video);
      setCurrentSection(video.section);
    }
  }, [videos]);

  // todo: error handling
  if (!videos || !currentVideo || !currentSection) return <div>error</div>;

  const contextValue = { currentVideo, currentSection, setCurrentSection };

  return (
    <div className={classes.currentVideo}>
      <div>
        <VideoPlayer videoPath={currentVideo.path} />
      </div>
      <SidebarContext.Provider value={contextValue as SidebarContextType}>
        <Sidebar currentSectionVideos={videos.filter(video => video.section === currentSection)} />
      </SidebarContext.Provider>
    </div>
  );
}

export default CurrentVideo;

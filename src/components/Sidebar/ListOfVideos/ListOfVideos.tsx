import { useContext } from 'react';
import SidebarContext, { SidebarContextType } from '../../../context/SidebarContext';
import { VideoType } from '../../../interface/types';
import VideoElement from '../VideoElement/VideoElement';
import classes from './ListOfVideos.module.scss';

interface ListOfVideosProps {
  currentSectionVideos: VideoType[];
}

function ListOfVideos({ currentSectionVideos }: ListOfVideosProps) {
  const { currentVideo, setCurrentVideo } = useContext(SidebarContext) as SidebarContextType;

  // todo: add context here passing current videos
  return (
    <div className={classes.listOfVideos}>
      {currentSectionVideos.map(video => {
        return (
          <VideoElement
            key={video._id}
            isActive={currentVideo._id === video._id}
            video={video}
            onClick={() => setCurrentVideo(video)}
          />
        );
      })}
    </div>
  );
}

export default ListOfVideos;

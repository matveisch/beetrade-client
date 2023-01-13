import { useContext } from 'react';
import classes from './Sidebar.module.scss';
import { mockVideos } from '../../assets/data/mockData';
import VideoElement from './VideoElement/VideoElement';
import { VideoType } from '../../interface/types';
import CourseChooser from './CourseChooser/CourseChooser';
import SidebarContext, { SidebarContextType } from '../../context/SidebarContext';

interface SidebarProps {
  currentSectionVideos: VideoType[];
}

export function percentOfCompletedVideos(videos: VideoType[]) {
  const numberOfVideos = videos.length;
  let numberOfCompletedVideos = 0;

  videos.forEach(video => {
    if (video.watched) {
      numberOfCompletedVideos += 1;
    }
  });

  return (numberOfCompletedVideos * 100) / numberOfVideos;
}

export function Sidebar({ currentSectionVideos }: SidebarProps) {
  const { currentVideo } = useContext(SidebarContext) as SidebarContextType;

  return (
    <aside className={classes.sideBar}>
      <div className={classes.progressBarContainer}>
        <h1>התקדמות בקורס</h1>
      </div>
      <div className={classes.progressBar}>
        <div className={classes.progress} style={{ width: `${percentOfCompletedVideos(mockVideos)}%` }} />
      </div>
      <CourseChooser />
      <div className={classes.listOfVideos}>
        {currentSectionVideos.map((video, index, row) => {
          return (
            <div key={video._id}>
              <VideoElement isActive={currentVideo._id === video._id} isWatched={video.watched} />
              {index + 1 !== row.length && <div className={classes.gap} />}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

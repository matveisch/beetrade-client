import classes from './Sidebar.module.scss';
import { VideoType } from '../../interface/types';
import CourseChooser from './CourseChooser/CourseChooser';
import ListOfVideos from './ListOfVideos/ListOfVideos';
import ProgressBar from './ProgressBar/ProgressBar';

interface SidebarProps {
  currentSectionVideos: VideoType[];
  videos: VideoType[];
}

function Sidebar({ currentSectionVideos, videos }: SidebarProps) {
  return (
    <aside className={classes.sideBar}>
      <ProgressBar videos={videos} />
      <CourseChooser />
      <ListOfVideos currentSectionVideos={currentSectionVideos} />
    </aside>
  );
}

export default Sidebar;

import classes from './Sidebar.module.scss';
import { VideoType } from '../../interface/types';
import CourseChooser from './CourseChooser/CourseChooser';
import ListOfVideos from './ListOfVideos/ListOfVideos';
import ProgressBar from './ProgressBar/ProgressBar';

interface SidebarProps {
  currentSectionVideos: VideoType[];
}

function Sidebar({ currentSectionVideos }: SidebarProps) {
  return (
    <aside className={classes.sideBar}>
      <ProgressBar videos={currentSectionVideos} />
      <CourseChooser />
      <ListOfVideos currentSectionVideos={currentSectionVideos} />
    </aside>
  );
}

export default Sidebar;

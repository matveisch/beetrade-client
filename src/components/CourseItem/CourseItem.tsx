import { Link } from 'react-router-dom';
import classes from './CourseItem.module.scss';
import { CourseType } from '../../interface/types';
import ProgressBar from '../Sidebar/ProgressBar/ProgressBar';
import { useAppSelector } from '../../hooks';
import { selectVideos } from '../../features/videos/videosSlice';

interface CourseItemProps {
  course: CourseType;
}
function CourseItem({ course }: CourseItemProps) {
  const videos = useAppSelector(selectVideos);

  if (!videos) return <div>error</div>;

  return (
    <div className={classes.courseItem}>
      <div className={classes.courseData}>
        <h3>{course.name}</h3>
        <ProgressBar videos={videos.filter(video => video.course?.name === course.name)} />
        <button type="button">
          <Link to="/">לצפיה</Link>
        </button>
      </div>
      <img src="" alt="" />
    </div>
  );
}

export default CourseItem;

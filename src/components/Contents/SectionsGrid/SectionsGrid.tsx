import SectionElement from './SectionElement/SectionElement';
import classes from './SectionsGrid.module.scss';
import { useAppSelector } from '../../../hooks';
import { selectSections } from '../../../features/sections/sectionsSlice';
import { selectCurrentVideo } from '../../../features/currentVideo/currentVideoSlice';

function SectionsGrid() {
  const sections = useAppSelector(selectSections);
  const currentVideo = useAppSelector(selectCurrentVideo);

  return (
    <div className={classes.sectionsGrid}>
      <h1>{currentVideo?.course.name}</h1>
      <div className={classes.coursesList}>
        {sections?.map(section => {
          return <SectionElement section={section} key={section._id} />;
        })}
      </div>
    </div>
  );
}

export default SectionsGrid;

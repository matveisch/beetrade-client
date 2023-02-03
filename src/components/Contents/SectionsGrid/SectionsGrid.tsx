import SectionElement from './SectionElement/SectionElement';
import classes from './SectionsGrid.module.scss';
import { useAppSelector } from '../../../hooks';
import { selectSections } from '../../../features/sections/sectionsSlice';

function SectionsGrid() {
  const sections = useAppSelector(selectSections);

  return (
    <div className={classes.sectionsGrid}>
      <h1>קורס: מ0-עד דבש</h1>
      <div className={classes.coursesList}>
        {sections?.map(section => {
          return <SectionElement section={section} key={section._id} />;
        })}
      </div>
    </div>
  );
}

export default SectionsGrid;

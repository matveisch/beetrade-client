import { mockSections } from '../../../assets/data/mockData';
import SectionElement from './SectionElement/SectionElement';
import classes from './SectionsGrid.module.scss';

function SectionsGrid() {
  return (
    <div className={classes.sectionsGrid}>
      <h1>קורס: מ0-עד דבש</h1>
      <div className={classes.coursesList}>
        {mockSections.map(section => {
          return <SectionElement section={section} key={section._id} />;
        })}
      </div>
    </div>
  );
}

export default SectionsGrid;

import classes from './CourseChooser.module.scss';
import arrow from '../../../assets/images/Arrow 6.svg';

function CourseChooser() {
  return (
    <div className={classes.courseChooser}>
      <div className={classes.courseTitle}>
        <button type="button">
          <img src={arrow} alt="" style={{ transform: 'rotate(-180deg)' }} />
        </button>
        <h1>שעור 1</h1>
        <button type="button">
          <img src={arrow} alt="" />
        </button>
      </div>
      <div className={classes.courseDescription}>
        <h1>דסקריבשן על השעור מה שם מה לומדים</h1>
      </div>
    </div>
  );
}

export default CourseChooser;

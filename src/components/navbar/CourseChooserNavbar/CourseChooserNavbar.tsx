import classes from './CourseChooserNavbar.module.scss';
import arrowDown from '../../../assets/images/arrowDown.svg';

function CourseChooserNavbar() {
  return (
    <div className={classes.courseChooserNavbar}>
      <h1>קורס: מ-0 עד דבש</h1>
      <img src={arrowDown} alt="arrow-down" />
    </div>
  );
}

export default CourseChooserNavbar;

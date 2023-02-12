import classes from './Navbar.module.scss';
import Profile from './Profile/Profile';
import CourseChooserNavbar from './CourseChooserNavbar/CourseChooserNavbar';

function Navbar() {
  return (
    <div className={classes.navbar}>
      <Profile />
      <CourseChooserNavbar />
      <h1>BeeTrade</h1>
    </div>
  );
}

export default Navbar;

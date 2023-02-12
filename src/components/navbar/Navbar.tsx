import classes from './Navbar.module.scss';
import Profile from './Profile/Profile';
import CourseChooserNavbar from './CourseChooserNavbar/CourseChooserNavbar';
import { useAppSelector } from '../../hooks';
import { selectUserSession } from '../../features/userSession/userSessionSlice';

function Navbar() {
  const token = useAppSelector(selectUserSession);

  return (
    <div
      className={classes.navbar}
      style={!token ? { gridTemplateColumns: 'unset', justifyContent: 'end' } : undefined}>
      {token && <Profile />}
      {token && <CourseChooserNavbar />}
      <h1>BeeTrade</h1>
    </div>
  );
}

export default Navbar;

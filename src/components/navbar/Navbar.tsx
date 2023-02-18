import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';
import Profile from './Profile/Profile';
import CourseChooserNavbar from './CourseChooserNavbar/CourseChooserNavbar';
import { useAppSelector } from '../../hooks';
import { selectUserSession } from '../../features/userSession/userSessionSlice';
import beeLogo from '../../assets/images/beeLogo.svg';

function Navbar() {
  const token = useAppSelector(selectUserSession);

  return (
    <div
      className={classes.navbar}
      style={!token ? { gridTemplateColumns: 'unset', justifyContent: 'end' } : undefined}>
      {token && <Profile />}
      {token && <CourseChooserNavbar />}
      <Link to="/" className={classes.logo}>
        <img src={beeLogo} alt="logo" />
        <h1>BeeTrade</h1>
      </Link>
    </div>
  );
}

export default Navbar;

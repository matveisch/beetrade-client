import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';
import Profile from './Profile/Profile';
import { useAppSelector } from '../../hooks';
import beeLogo from '../../assets/images/beeLogo.svg';
import { selectUserData } from '../../features/userData/userDataSlice';

function Navbar() {
  const userData = useAppSelector(selectUserData);

  return (
    <div
      className={classes.navbar}
      style={!userData ? { gridTemplateColumns: 'unset', justifyContent: 'end' } : undefined}>
      {userData && <Profile />}
      {/* {userData && <CourseChooserNavbar />} – make it active as there will be more courses */}
      <div className={classes.logo}>
        <img src={beeLogo} alt="logo" />
        <h1>BeeTrade</h1>
      </div>
    </div>
  );
}

export default Navbar;

import classes from './Profile.module.scss';
import profileIcon from '../../../assets/images/Group.svg';

function Profile() {
  return (
    <div className={classes.profile}>
      <div className={classes.blockContainer}>
        <h1>פרופיל</h1>
        <img src={profileIcon} alt="profile-icon" />
      </div>
    </div>
  );
}

export default Profile;

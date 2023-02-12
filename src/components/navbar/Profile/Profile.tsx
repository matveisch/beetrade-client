import { useState } from 'react';
import classes from './Profile.module.scss';
import profileIcon from '../../../assets/images/profileIcon.svg';
import ProfilePopup from './ProfilePopup/ProfilePopup';

function Profile() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={classes.profile}>
      <div className={classes.blockContainer} onClick={() => setOpenPopup(true)}>
        <h1>פרופיל</h1>
        <img src={profileIcon} alt="profile-icon" />
      </div>
      <ProfilePopup open={openPopup} setOpen={setOpenPopup} />
    </div>
  );
}

export default Profile;

import { useState } from 'react';
import classes from './Profile.module.scss';
import profileIcon from '../../../assets/images/profileImage.svg';
import ProfilePopup from './ProfilePopup/ProfilePopup';

function Profile() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={classes.profile}>
      <button type="button" className={classes.blockContainer} onClick={() => setOpenPopup(true)}>
        <h1>פרופיל</h1>
        <img src={profileIcon} alt="profile-icon" />
      </button>
      <ProfilePopup open={openPopup} setOpen={setOpenPopup} />
    </div>
  );
}

export default Profile;

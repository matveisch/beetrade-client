import { useEffect, useRef, useState } from 'react';
import classes from './Profile.module.scss';
import profileIcon from '../../../assets/images/profileImage.svg';
import ProfilePopup from './ProfilePopup/ProfilePopup';

function Profile() {
  const [openPopup, setOpenPopup] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleClickOutside(e: { target: any }) {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setOpenPopup(false);
    }
  }

  useEffect(() => {
    if (openPopup && screenWidth < 425) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [openPopup, screenWidth]);

  return (
    <div className={classes.profile}>
      <button type="button" className={classes.blockContainer} onClick={() => setOpenPopup(true)}>
        <h1>פרופיל</h1>
        <img src={profileIcon} alt="profile-icon" />
      </button>
      <div ref={wrapperRef}>
        <ProfilePopup open={openPopup} setOpen={setOpenPopup} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      {openPopup && screenWidth > 425 && <div className={classes.popupWrapper} onClick={handleClickOutside} />}
    </div>
  );
}

export default Profile;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProfilePopup.module.scss';
import PopupOption from './PopupOption/PopupOption';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import profileIcon from '../../../../assets/images/profileImage.svg';
import studyIcon from '../../../../assets/images/studyIcon.svg';
import settingsIcon from '../../../../assets/images/settingsIcon.svg';
import telegramIcon from '../../../../assets/images/telegramIcon.svg';
import friendIcon from '../../../../assets/images/friendIcon.svg';
import closeButton from '../../../../assets/images/closeButton.svg';
import exitIcon from '../../../../assets/images/exitIcon.svg';
import { selectUserData, setUserData } from '../../../../features/userData/userDataSlice';
import { setLogStatus } from '../../../../Layout';

interface ProfilePopupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  {
    title: 'החומרים שלי',
    image: studyIcon,
    link: '/products',
  },
  {
    title: 'הגדרות',
    image: settingsIcon,
    link: '/settings',
  },
  {
    title: 'להצטרף לרשתות חברתיות',
    image: telegramIcon,
    link: '/',
  },
  {
    title: 'להזמין חבר',
    image: friendIcon,
    link: '/',
  },
];

function ProfilePopup({ open, setOpen }: ProfilePopupProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  function handleSignOut() {
    if (userData) setLogStatus(userData);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    dispatch(setUserData(undefined));
    setOpen(false);
    navigate('/signin');
  }

  return (
    <div className={classes.profilePopup} style={!open ? { display: 'none' } : undefined}>
      <div className={classes.popupHeader}>
        <button type="button" onClick={() => setOpen(false)}>
          <img src={closeButton} alt="close-button" />
        </button>
        <h1>{userData?.firstName}</h1>
        <img src={profileIcon} alt="profile-icon" />
      </div>
      <div className={classes.linksContainer}>
        {links.map(link => (
          <PopupOption
            text={link.title}
            img={link.image}
            link={link.link}
            onCLick={() => setOpen(false)}
            key={link.title}
          />
        ))}
      </div>
      <button type="button" className={classes.exitContainer} onClick={handleSignOut}>
        <img src={exitIcon} alt="exit-icon" />
        <h1>להתנתק</h1>
      </button>
    </div>
  );
}

export default ProfilePopup;

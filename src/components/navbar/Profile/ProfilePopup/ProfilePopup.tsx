import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProfilePopup.module.scss';
import { UserDataType } from '../../../../interface/types';
import PopupOption from './PopupOption/PopupOption';
import { setUserSession } from '../../../../features/userSession/userSessionSlice';
import { useAppDispatch } from '../../../../hooks';

import profileIcon from '../../../../assets/images/profileIcon.svg';
import closeButton from '../../../../assets/images/closeButton.svg';
import exitIcon from '../../../../assets/images/exitIcon.svg';

interface ProfilePopupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  {
    title: 'החומרים שלי',
    image: profileIcon,
  },
  {
    title: 'הגדרות',
    image: profileIcon,
  },
  {
    title: 'להצטרף לרשתות חברתיות',
    image: profileIcon,
  },
  {
    title: 'להזמין חבר',
    image: profileIcon,
  },
];

function ProfilePopup({ open, setOpen }: ProfilePopupProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!localStorage.getItem('user')) return <div>error</div>;

  const userData: UserDataType = JSON.parse(localStorage.getItem('user') || '');

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUserSession(undefined));

    setOpen(false);
    navigate('/signin');
  }

  return (
    <div className={classes.profilePopup} style={!open ? { display: 'none' } : undefined}>
      <div className={classes.popupHeader}>
        <button type="button" onClick={() => setOpen(false)}>
          <img src={closeButton} alt="close-button" />
        </button>
        <h1>{userData.firstName}</h1>
        <img src={profileIcon} alt="profile-icon" />
      </div>
      <div className={classes.linksContainer}>
        {links.map(link => (
          <PopupOption text={link.title} img={link.image} key={link.title} />
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

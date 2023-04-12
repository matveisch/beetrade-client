import { useState } from 'react';
import classes from './CourseChooserNavbar.module.scss';
import arrowDown from '../../../assets/images/arrowDown.svg';
import { useAppSelector } from '../../../hooks';
import { selectCurrentVideo } from '../../../features/currentVideo/currentVideoSlice';
import { selectUserData } from '../../../features/userData/userDataSlice';

function CourseChooserNavbar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const userData = useAppSelector(selectUserData);

  return (
    <div className={classes.chooserWrapper}>
      <div className={classes.courseChooserNavbar} onClick={() => setPopupOpen(!popupOpen)}>
        <h1>{currentVideo?.course.name}</h1>
        <img src={arrowDown} alt="arrow-down" style={popupOpen ? { transform: 'rotate(180deg)' } : undefined} />
      </div>
      {popupOpen && (
        <div className={classes.courseChooserPopup}>
          <div className={classes.innerCourseChooserPopup}>
            {userData?.courses.map(course => {
              return (
                <p key={course.name} onClick={() => setPopupOpen(false)}>
                  {course.name}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseChooserNavbar;

import classes from './CourseChooser.module.scss';
import arrow from '../../../assets/images/Arrow 6.svg';
import { useAppSelector } from '../../../hooks';
import { selectSections } from '../../../features/sections/sectionsSlice';
import { useSwiper } from 'swiper/react';

function CourseChooser({ currentSlide }: { currentSlide: number }) {
  const sections = useAppSelector(selectSections);
  const swiper = useSwiper();

  // todo: error handling
  if (!sections) return <div>error</div>;

  return (
    <div className={classes.courseChooser}>
      <div className={classes.courseTitle}>
        <button type="button" onClick={() => swiper.slidePrev()}>
          <img src={arrow} alt="" style={{ transform: 'rotate(-180deg)' }} />
        </button>
        <h1>{sections[currentSlide].name}</h1>
        <button type="button" onClick={() => swiper.slideNext()}>
          <img src={arrow} alt="" />
        </button>
      </div>
      <div className={classes.courseDescription}>
        <h1>{sections[currentSlide].description}</h1>
      </div>
    </div>
  );
}

export default CourseChooser;

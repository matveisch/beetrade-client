import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { useAppSelector } from '../../hooks';
import classes from './Contents.module.scss';
import Description from './Description/Description';
import SectionsGrid from './SectionsGrid/SectionsGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperButton from '../../ui/SwiperButton/SwiperButton';

function Contents() {
  const currentVideo = useAppSelector(selectCurrentVideo);

  if (!currentVideo) return <div>error</div>;

  return (
    <div className={classes.contents}>
      <Swiper centeredSlides slidesPerView="auto" className={classes.swiper}>
        <nav className={classes.buttonsWrapper}>
          <SwiperButton
            title="סקירה כללית"
            slideTo={0}
            style={{ background: 'linear-gradient(264.3deg, #9E2FFF -168.03%, #FF9E2F 100%)' }}
          />
          <SwiperButton
            title="רשימת שיעורים"
            slideTo={1}
            style={{ background: 'linear-gradient(264.3deg, #9E2FFF -168.03%, #FF9E2F 100%)' }}
          />
        </nav>
        <SwiperSlide>
          <div className={classes.contents}>
            <Description body={currentVideo.description} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <SectionsGrid />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Contents;

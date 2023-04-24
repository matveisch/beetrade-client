import { useSwiper } from 'swiper/react';
import classes from './SwiperButton.module.scss';

export default function SwiperButton({ title, slideTo }: { title: string; slideTo: number }) {
  const swiper = useSwiper();

  return (
    <button className={classes.swiperButton} onClick={() => swiper.slideTo(slideTo)} type="button">
      {title}
    </button>
  );
}

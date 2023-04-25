import { useSwiper } from 'swiper/react';
import classes from './SwiperButton.module.scss';
import { CSSProperties } from 'react';

export default function SwiperButton({
  title,
  slideTo,
  style,
}: {
  title: string;
  slideTo: number;
  style?: CSSProperties;
}) {
  const swiper = useSwiper();

  return (
    <button className={classes.swiperButton} onClick={() => swiper.slideTo(slideTo)} type="button" style={style}>
      {title}
    </button>
  );
}

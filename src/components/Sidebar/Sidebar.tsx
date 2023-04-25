import classes from './Sidebar.module.scss';
import { SectionType } from '../../interface/types';
import CourseChooser from './CourseChooser/CourseChooser';
import ListOfVideos from './ListOfVideos/ListOfVideos';
import ProgressBar from './ProgressBar/ProgressBar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectSections, setSections } from '../../features/sections/sectionsSlice';
import { useEffect, useState } from 'react';
import { getData } from '../../lib';
import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { selectVideos } from '../../features/videos/videosSlice';
import Loader from '../../ui/Loader/Loader';

function Sidebar() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useAppDispatch();
  const currentVideo = useAppSelector(selectCurrentVideo);
  const sections = useAppSelector(selectSections);
  const videos = useAppSelector(selectVideos);

  useEffect(() => {
    getData<SectionType[]>(`section?courseId=${currentVideo?.course._id}`).then(data => {
      dispatch(setSections(data));
    });
  }, []);

  if (!videos) return <Loader />;

  return (
    <aside className={classes.sideBar}>
      <ProgressBar videos={videos} />
      <Swiper
        centeredSlides
        slidesPerView="auto"
        className={classes.swiper}
        onSlideChange={swiper => setCurrentSlide(swiper.activeIndex)}>
        <nav className={classes.buttonsWrapper}>
          <CourseChooser currentSlide={currentSlide} />
        </nav>
        {sections?.map(section => {
          return (
            <SwiperSlide key={`slide_${section._id}`}>
              <ListOfVideos currentSectionVideos={videos.filter(video => video.section._id === section._id)} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </aside>
  );
}

export default Sidebar;

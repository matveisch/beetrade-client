import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { VideoType } from '../../interface/types';
import Contents from '../../components/Contents/Contents';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectVideos, setVideos } from '../../features/videos/videosSlice';
import { selectCurrentVideo, setCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { selectCurrentSection, setCurrentSection } from '../../features/currentSection/currentSectionSlice';
import Description from '../../components/Contents/Description/Description';
import SectionsGrid from '../../components/Contents/SectionsGrid/SectionsGrid';
import { selectUserData, setUserData } from '../../features/userData/userDataSlice';
import { getData, putData } from '../../lib';
import Loader from '../../ui/Loader/Loader';
import { setGlobalError } from '../../features/globalError/globalErrorSlice';
import SwiperButton from '../../ui/SwiperButton/SwiperButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos?.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const videos = useAppSelector(selectVideos);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const currentSection = useAppSelector(selectCurrentSection);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUserData(undefined));
    if (userData) putData(`/user/${userData?._id}/handleLogout`);
    navigate('/signin');
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (userData) {
      getData<VideoType[]>('videos', handleSignOut).then(data => {
        dispatch(setVideos(data));

        const video = getFirstUnseenVideo(data);
        dispatch(setCurrentVideo(video));
        dispatch(setCurrentSection(video.section));
      });
    }
  }, [userData]);

  if (userData && !userData.courses) {
    dispatch(setGlobalError('You have no courses'));
    navigate('/products');
  }

  if (!videos || !currentVideo || !currentSection) return <Loader />;

  if (windowWidth > 768) {
    return (
      <div className={classes.currentVideo}>
        <Sidebar
          currentSectionVideos={videos.filter(video => video.section._id === currentSection._id)}
          videos={videos}
        />
        <div className={classes.videoPlayerContainer}>
          <VideoPlayer />
          <Contents />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.currentVideoMobile}>
      <VideoPlayer />
      <Swiper centeredSlides slidesPerView="auto" className={classes.swiper}>
        <nav className={classes.buttonsWrapper}>
          <SwiperButton
            title="sidebar"
            slideTo={0}
            style={{ background: 'linear-gradient(264.3deg, #9E2FFF -168.03%, #FF9E2F 100%)' }}
          />
          <SwiperButton
            title="סקירה כללית"
            slideTo={1}
            style={{ background: 'linear-gradient(264.3deg, #9E2FFF -168.03%, #FF9E2F 100%)' }}
          />
          <SwiperButton
            title="רשימת שיעורים"
            slideTo={2}
            style={{ background: 'linear-gradient(264.3deg, #9E2FFF -168.03%, #FF9E2F 100%)' }}
          />
        </nav>
        <SwiperSlide>
          <Sidebar
            currentSectionVideos={videos.filter(video => video.section._id === currentSection._id)}
            videos={videos}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Description body={currentVideo.description} />
        </SwiperSlide>
        <SwiperSlide>
          <SectionsGrid />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CurrentVideo;

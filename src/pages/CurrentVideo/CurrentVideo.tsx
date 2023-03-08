import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { VideoType } from '../../interface/types';
import Contents from '../../components/Contents/Contents';
import { useAppSelector } from '../../hooks';
import { selectVideos } from '../../features/videos/videosSlice';
import { selectCurrentVideo } from '../../features/currentVideo/currentVideoSlice';
import { selectCurrentSection } from '../../features/currentSection/currentSectionSlice';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const videos = useAppSelector(selectVideos);
  const currentVideo = useAppSelector(selectCurrentVideo);
  const currentSection = useAppSelector(selectCurrentSection);

  // todo: error handling
  if (!videos || !currentVideo || !currentSection) return <div>error</div>;

  return (
    <div className={classes.currentVideo}>
      <div className={classes.videoPlayerContainer}>
        <VideoPlayer />
        <Contents />
      </div>
      <Sidebar
        currentSectionVideos={videos.filter(video => video.section._id === currentSection._id)}
        videos={videos}
      />
    </div>
  );
}

export default CurrentVideo;

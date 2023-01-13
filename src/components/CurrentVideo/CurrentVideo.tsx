import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Sidebar } from '../Sidebar/Sidebar';
import { VideoType } from '../../interface/types';

interface CurrentVideoProps {
  video: VideoType;
}
function CurrentVideo({ video }: CurrentVideoProps) {
  return (
    <div className={classes.currentVideo}>
      <VideoPlayer videoPath={video.path} />
      <Sidebar currentVideoId={video._id} />
    </div>
  );
}

export default CurrentVideo;

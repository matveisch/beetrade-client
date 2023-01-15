import classes from './VideoElement.module.scss';
import BulletPoint from './BulletPoint/BulletPoint';
import { VideoType } from '../../../interface/types';

interface VideoElementProps {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  video: VideoType;
}

function VideoElement({ isActive, onClick, video }: VideoElementProps) {
  return (
    <button
      className={classes.videoElement}
      onClick={onClick}
      type="button"
      style={isActive ? { background: 'linear-gradient(0deg, #9e2fff -82.5%, #ff9e2f 193.12%)' } : undefined}>
      <div className={classes.rightContainer}>
        <BulletPoint isChecked={video.watched} />
        <div className={classes.description}>
          <h1>{video.name}</h1>
          <p>{video.description}</p>
        </div>
      </div>
      <div className={classes.videoLengthContainer}>
        <p>10 דק’</p>
      </div>
    </button>
  );
}

export default VideoElement;

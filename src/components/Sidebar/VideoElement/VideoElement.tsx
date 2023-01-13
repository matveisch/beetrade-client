import classes from './VideoElement.module.scss';
import BulletPoint from '../../../ui/BulletPoint/BulletPoint';

interface VideoElementProps {
  isActive: boolean;
  isWatched: boolean;
}

function VideoElement({ isActive, isWatched }: VideoElementProps) {
  return (
    <div
      className={classes.videoElement}
      style={isActive ? { background: 'linear-gradient(0deg, #9e2fff -82.5%, #ff9e2f 193.12%)' } : undefined}>
      <BulletPoint isChecked={isWatched} />
    </div>
  );
}

export default VideoElement;

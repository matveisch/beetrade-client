import classes from './VideoElement.module.scss';
import BulletPoint from './BulletPoint/BulletPoint';

interface VideoElementProps {
  isActive: boolean;
  isWatched: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function VideoElement({ isActive, isWatched, onClick }: VideoElementProps) {
  return (
    <button
      className={classes.videoElement}
      onClick={onClick}
      type="button"
      style={isActive ? { background: 'linear-gradient(0deg, #9e2fff -82.5%, #ff9e2f 193.12%)' } : undefined}>
      <BulletPoint isChecked={isWatched} />
    </button>
  );
}

export default VideoElement;

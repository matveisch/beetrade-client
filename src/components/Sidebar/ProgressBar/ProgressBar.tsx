import { VideoType } from '../../../interface/types';
import classes from './ProgressBar.module.scss';

export function percentOfCompletedVideos(videos: VideoType[]) {
  if (videos.length === 0) return 0;

  const numberOfVideos = videos.length;
  let numberOfCompletedVideos = 0;

  videos.forEach(video => {
    if (video.watched) {
      numberOfCompletedVideos += 1;
    }
  });

  return (numberOfCompletedVideos * 100) / numberOfVideos;
}

interface ProgressBarProps {
  videos: VideoType[];
}

function ProgressBar({ videos }: ProgressBarProps) {
  return (
    <div className={classes.progressBarContainer}>
      <h1>התקדמות בקורס</h1>
      <div className={classes.progressBar}>
        <div className={classes.progress} style={{ width: `${percentOfCompletedVideos(videos)}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;

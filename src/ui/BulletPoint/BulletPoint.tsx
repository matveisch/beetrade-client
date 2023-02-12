import React, { useEffect, useState } from 'react';
import classes from './BulletPoint.module.scss';
import emptyBullet from '../../assets/images/empty-bullet.svg';
import bulletFill from '../../assets/images/bullet-fill.svg';
import { useAppDispatch } from '../../hooks';
import { setVideos } from '../../features/videos/videosSlice';

interface BulletPointProps {
  isChecked: boolean;
  videoId?: string;
  frameWidth?: string;
  fillWidth?: string;
  onClick?: React.MouseEventHandler;
}

function BulletPoint({ isChecked, videoId, frameWidth, fillWidth, onClick }: BulletPointProps) {
  const [isMarked, setIsMarked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isChecked) setIsMarked(true);
  }, [isChecked]);

  async function setWatchStatus(status: boolean) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/videos/${videoId}/watchStatus`, {
        method: 'PUT',
        body: JSON.stringify({
          watched: status,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classes.bulletContainer}
      onClick={e => {
        if (onClick) onClick(e);

        if (videoId) {
          setWatchStatus(!isMarked).then(videos => {
            dispatch(setVideos(videos));
          });
        }

        setIsMarked(!isMarked);
      }}
      style={frameWidth ? { width: frameWidth } : undefined}>
      <img src={emptyBullet} alt="" className={classes.bulletFrame} />
      {isMarked && (
        <img src={bulletFill} alt="" className={classes.bullet} style={fillWidth ? { width: fillWidth } : undefined} />
      )}
    </div>
  );
}

export default BulletPoint;

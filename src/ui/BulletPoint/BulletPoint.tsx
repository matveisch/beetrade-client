import { useEffect, useState } from 'react';
import classes from './BulletPoint.module.scss';
import emptyBullet from '../../assets/images/empty-bullet.svg';
import bulletFill from '../../assets/images/bullet-fill.svg';

interface BulletPointProps {
  isChecked: boolean;
  videoId?: string;
}

function BulletPoint({ isChecked, videoId }: BulletPointProps) {
  const [isMarked, setIsMarked] = useState(false);

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

  useEffect(() => {
    setWatchStatus(isMarked);
  }, [isMarked]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={classes.bulletContainer} onClick={() => setIsMarked(!isMarked)}>
      <img src={emptyBullet} alt="" className={classes.bulletFrame} />
      {isMarked && <img src={bulletFill} alt="" className={classes.bullet} />}
    </div>
  );
}

export default BulletPoint;

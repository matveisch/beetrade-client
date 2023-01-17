import classes from './BulletPoint.module.scss';
import emptyBullet from '../../../../assets/images/empty-bullet.svg';
import bulletFill from '../../../../assets/images/bullet-fill.svg';

interface BulletPointProps {
  isChecked: boolean;
}

function BulletPoint({ isChecked }: BulletPointProps) {
  // todo: on bullet point click fetch data to change the video status
  return (
    <div className={classes.bulletContainer}>
      <img src={emptyBullet} alt="" className={classes.bulletFrame} />
      {isChecked && <img src={bulletFill} alt="" className={classes.bullet} />}
    </div>
  );
}

export default BulletPoint;

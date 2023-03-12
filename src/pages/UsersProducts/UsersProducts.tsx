import classes from './UsersProducts.module.scss';
import CourseItem from '../../components/CourseItem/CourseItem';
import { useAppSelector } from '../../hooks';
import { selectUserData } from '../../features/userData/userDataSlice';

function UsersProducts() {
  const userData = useAppSelector(selectUserData);

  return (
    <div className={classes.usersProducts}>
      <h2>החומרים שלי</h2>
      <h3>קורסים</h3>
      <div className={classes.productsBlock}>
        {userData?.courses.map(course => {
          return <CourseItem course={course} key={course._id} />;
        })}
      </div>
    </div>
  );
}

export default UsersProducts;

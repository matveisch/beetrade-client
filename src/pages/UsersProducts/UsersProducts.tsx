import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './UsersProducts.module.scss';
import CourseItem from '../../components/CourseItem/CourseItem';
import { useAppSelector } from '../../hooks';
import { selectUserData } from '../../features/userData/userDataSlice';

function UsersProducts() {
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) navigate('/signin');
  }, []);

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

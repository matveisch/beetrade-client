import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './UsersProducts.module.scss';
import CourseItem from '../../components/CourseItem/CourseItem';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserData, setUserData } from '../../features/userData/userDataSlice';
import { selectVideos, setVideos } from '../../features/videos/videosSlice';
import { getData, putData } from '../../lib';
import { VideoType } from '../../interface/types';
import Loader from '../../ui/Loader/Loader';
import BookItem from '../../components/BookItem/BookItem';

function UsersProducts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const videos = useAppSelector(selectVideos);
  const token = localStorage.getItem('token');

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUserData(undefined));
    if (userData) putData(`/user/${userData?._id}/handleLogout`);
    navigate('/signin');
  }

  if (!videos) {
    getData<VideoType[]>('videos', handleSignOut).then(items => {
      dispatch(setVideos(items));
    });
  }

  useEffect(() => {
    if (token === null) navigate('/signin');
  }, []);

  console.log(userData?.books);

  if (!userData) return <Loader />;

  return (
    <div className={classes.usersProducts}>
      <h2>החומרים שלי</h2>
      <h3>קורסים</h3>
      <div className={classes.productsBlock}>
        {userData?.courses.map(course => {
          return <CourseItem course={course} key={course._id} />;
        })}
      </div>
      <h3>Books</h3>
      <div className={classes.productsBlock}>
        {userData.books.map(book => {
          return <BookItem book={book} key={book._id} />;
        })}
      </div>
    </div>
  );
}

export default UsersProducts;

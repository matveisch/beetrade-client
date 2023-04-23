import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './styles/App.module.scss';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectUserData, setUserData } from './features/userData/userDataSlice';
import Navbar from './components/Navbar/Navbar';
import { selectGlobalError, setGlobalError } from './features/globalError/globalErrorSlice';
import ErrorMessage from './ui/ErrorMessage/ErrorMessage';
import { getData, putData } from './lib';
import { UserDataType } from './interface/types';

function Layout() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const globalError = useAppSelector(selectGlobalError);
  const [animationOut, setAnimationOut] = useState(false);

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUserData(undefined));
    if (userData) putData(`user/${userData?._id}/handleLogout`);
    navigate('/signin');
  }

  useEffect(() => {
    if (globalError) {
      setTimeout(() => {
        setAnimationOut(true);

        setTimeout(() => {
          dispatch(setGlobalError(undefined));
          setAnimationOut(false);
        }, 500);
      }, 5000);
    }
  }, [globalError]);

  useEffect(() => {
    if (token !== null && id !== null) {
      getData<UserDataType>(`user/${id}`, handleSignOut).then(data => {
        dispatch(setUserData(data));
      });
    }
  }, []);

  useEffect(() => {
    if (token === null) navigate('/signin');
  }, []);

  // prevent right click
  useEffect(() => {
    const handleContextmenu = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  return (
    <div className={classes.app}>
      <header>
        <Navbar />
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      {globalError && (
        <div
          className={`${classes.errorWrapper} ${animationOut ? classes.out : classes.in}`}
          style={animationOut ? { bottom: '10vh' } : undefined}>
          <ErrorMessage error={globalError} isGlobal />
        </div>
      )}
    </div>
  );
}

export default Layout;

import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './styles/App.module.scss';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectUserData, setUserData } from './features/userData/userDataSlice';
import { setVideos } from './features/videos/videosSlice';
import { setCurrentVideo } from './features/currentVideo/currentVideoSlice';
import { setCurrentSection } from './features/currentSection/currentSectionSlice';
import { getFirstUnseenVideo } from './pages/CurrentVideo/CurrentVideo';
import { UserDataType } from './interface/types';
import Navbar from './components/Navbar/Navbar';
import { selectGlobalError, setGlobalError } from './features/globalError/globalErrorSlice';
import ErrorMessage from './ui/ErrorMessage/ErrorMessage';
import { store } from './store';

export async function getUserData(id: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const text = await response.json();
      if (typeof text.message === 'string') store.dispatch(setGlobalError(text.message));
    }

    return await response.json();
  } catch (e) {
    if (typeof e === 'string') store.dispatch(setGlobalError(e));
    store.dispatch(setGlobalError('there was a problem getting user data '));
  }
}

export async function setLogStatus(userData: UserDataType) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/user/${userData?._id}/handleLogout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const text = await response.json();
      if (typeof text.message === 'string') store.dispatch(setGlobalError(text.message));
    }
  } catch (e) {
    if (typeof e === 'string') store.dispatch(setGlobalError(e));
    store.dispatch(setGlobalError('there was a problem setting log status'));
  }
}

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
    if (userData) setLogStatus(userData);
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
      }, 3000);
    }
  }, [globalError]);

  async function getVideos() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/videos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 401) handleSignOut();

      return await response.json();
    } catch (e) {
      dispatch(setGlobalError("can't load videos"));
    }
  }

  useEffect(() => {
    if (userData) {
      getVideos().then(data => {
        dispatch(setVideos(data));

        const video = getFirstUnseenVideo(data);
        dispatch(setCurrentVideo(video));
        dispatch(setCurrentSection(video.section));
      });
    }
  }, [userData]);

  useEffect(() => {
    if (token !== null && id !== null) {
      getUserData(id).then(data => {
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

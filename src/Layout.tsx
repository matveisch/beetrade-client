import { useEffect } from 'react';
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
      throw Error(text.message);
    }

    return await response.json();
  } catch (e) {
    console.log(e);
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
      throw Error(text.message);
    }
  } catch (e) {
    console.log(e);
  }
}

function Layout() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUserData(undefined));
    if (userData) setLogStatus(userData);
    navigate('/signin');
  }

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
      console.log(e);
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
      <header>{userData && <Navbar />}</header>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

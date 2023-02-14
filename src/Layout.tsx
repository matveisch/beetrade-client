import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import classes from './styles/App.module.scss';
import { useAppDispatch } from './hooks';
import { setUserSession } from './features/userSession/userSessionSlice';
import { setUserData } from './features/userData/userDataSlice';

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

function Layout() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  if (token !== null) dispatch(setUserSession(token || undefined));

  useEffect(() => {
    if (token !== null && id !== null) {
      getUserData(id).then(data => {
        dispatch(setUserData(data));
      });
    }
  }, []);

  return (
    <div className={classes.app}>
      <header>
        <Navbar />
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

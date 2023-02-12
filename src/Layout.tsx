import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import classes from './styles/App.module.scss';
import { useAppDispatch } from './hooks';
import { setUserSession } from './features/userSession/userSessionSlice';

function Layout() {
  const dispatch = useAppDispatch();

  if (localStorage.getItem('token') !== null) dispatch(setUserSession(localStorage.getItem('token') || undefined));

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

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import classes from './styles/App.module.scss';

function Layout() {
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

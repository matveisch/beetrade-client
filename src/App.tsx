import classes from './styles/App.module.scss';
import Navbar from './components/Navbar/Navbar';
import CurrentVideo from './components/CurrentVideo/CurrentVideo';

function App() {
  return (
    <div className={classes.app}>
      <header>
        <Navbar />
      </header>
      <main className={classes.main}>
        <CurrentVideo />
      </main>
    </div>
  );
}

export default App;

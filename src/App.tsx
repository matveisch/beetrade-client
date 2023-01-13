import classes from './styles/App.module.scss';
import { Navbar } from './components/Navbar/Navbar';
import { CurrentVideo } from './components/CurrentVideo/CurrentVideo';
import { videos } from './assets/data/mockData';

function App() {
  return (
    <div className={classes.app}>
      <header>
        <Navbar />
      </header>
      <main className={classes.main}>
        <CurrentVideo video={videos[1]} />
      </main>
    </div>
  );
}

export default App;

import classes from './styles/App.module.scss';
import { Navbar } from './components/Navbar/Navbar';
import mockVideos from './assets/data/mockData';
import CurrentVideo from './components/CurrentVideo/CurrentVideo';

function App() {
  return (
    <div className={classes.app}>
      <header>
        <Navbar />
      </header>
      <main className={classes.main}>
        <CurrentVideo video={mockVideos[1]} />
      </main>
    </div>
  );
}

export default App;

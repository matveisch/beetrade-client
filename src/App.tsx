import classes from "./styles/App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { VideoPlayer } from "./components/VideoPlayer/VideoPlayer";

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
      <VideoPlayer />
    </div>
  );
}

export default App;

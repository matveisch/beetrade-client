import classes from "./styles/App.module.scss";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
    </div>
  );
}

export default App;

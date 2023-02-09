import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CurrentVideo from './pages/CurrentVideo/CurrentVideo';
import SignIn from './pages/SingIn/SignIn';
import Layout from './Layout';
import SignUp from './pages/SignUp/SignUp';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CurrentVideo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;

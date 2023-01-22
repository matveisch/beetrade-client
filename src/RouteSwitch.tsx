import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CurrentVideo from './pages/CurrentVideo/CurrentVideo';
import SignIn from './pages/SingIn/SignIn';
import Layout from './Layout';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route index element={<CurrentVideo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;

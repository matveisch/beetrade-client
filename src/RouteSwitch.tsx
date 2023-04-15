import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CurrentVideo from './pages/CurrentVideo/CurrentVideo';
import SignIn from './pages/SingIn/SignIn';
import Layout from './Layout';
import SignUp from './pages/SignUp/SignUp';
import Settings from './pages/Settings/Settings';
import UsersProducts from './pages/UsersProducts/UsersProducts';
import Book from './pages/Book/Book';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CurrentVideo />} />
          <Route path="/products" element={<UsersProducts />} />
          <Route path="/book" element={<Book />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;

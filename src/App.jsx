import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { useSelector } from 'react-redux';
import useFetchUserInfo from './costumHooks/useFetchUserInfo';

function App() {
  const user = useSelector((state) => state.user.user);
  const { refetch } = useFetchUserInfo();
  const location = useLocation(); // 👈 track route change

  useEffect(() => {
    refetch(); // runs on every route change
  }, [location.pathname]); // 👈 dependency added

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
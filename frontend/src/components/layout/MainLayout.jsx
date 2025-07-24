import { Outlet } from 'react-router';
import Navbar from '../core/Navbar.jsx';
import Background from './Background.jsx';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
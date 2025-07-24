import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/layout/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PrivateRoute from './components/core/PrivateRoute.jsx';

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        className: 'dark:bg-gray-700 dark:text-white shadow-lg',
      }} />
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
            <Route path="/products/:id" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboardPage /></PrivateRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
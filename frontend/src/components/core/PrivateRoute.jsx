import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Spinner from './Spinner.jsx';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-[calc(100vh-80px)]"><Spinner /></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
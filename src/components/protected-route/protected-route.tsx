import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({
  component,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) return <Preloader />;

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};

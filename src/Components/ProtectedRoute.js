import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const adminEmail = "admin@example.com"; // <-- Hardcoded admin email

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsAuthorized(false);
        return;
      }

      if (adminOnly && user.email !== adminEmail) {
        setIsAuthorized(false); // not an admin
      } else {
        setIsAuthorized(true); // either admin or regular user
      }
    });

    return () => unsubscribe();
  }, [adminOnly]);

  if (isAuthorized === null) return <p>Loading...</p>;

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

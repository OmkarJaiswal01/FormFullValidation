import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const ProtectedRoute = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const jump = useNavigate(); // Move useNavigate inside the functional component
    const [cookies] = useCookies(['mycookie']);

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = cookies.mycookie; // Get the cookie value
        if (!token) {
          // If cookie doesn't exist, redirect to login
          jump("/login");
        }
      };

      checkAuthentication();
    }, [cookies, jump]); // Add cookies and jump to dependency array

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default ProtectedRoute;

import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './Hoc';
function Dashboard() {
  const [cookies] = useCookies(['mycookie']);

  // If 'mycookie' is not present, redirect the user to the login page
  // if (!cookies.mycookie) {
  //   return <Navigate to="/Login" />;
  // }

  // Render the dashboard content here
  return (
    <div>
      <h1 className=' text-lg text-green-500'>Welcome to Dashboard welcom to om ji</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}

  export default  ProtectedRoute(Dashboard);

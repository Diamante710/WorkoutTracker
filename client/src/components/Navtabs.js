import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const NavTabs = () => {
  const [navigateTo, setNavigateTo] = useState(null);

  const handleSignIn = () => {
    setNavigateTo('/LoginForm');
  };

  const handleSignUp = () => {
    setNavigateTo('/SignupForm');
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <div>
      <h2>Navigation Tabs</h2>
      <ul>
        <li>
          <button onClick={handleSignIn}>Login</button>
        </li>
        <li>
          <button onClick={handleSignUp}>Sign Up</button>
        </li>
      </ul>
    </div>
  );
};

export default NavTabs;
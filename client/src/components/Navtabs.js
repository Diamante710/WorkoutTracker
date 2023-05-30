import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const NavTabs = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  const handleSignIn = () => {
    setRedirectTo('/UserHomepage');
  };

  const handleSignUp = () => {
    setRedirectTo('/SignupForm');
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div>
      <h2>Navigation Tabs</h2>
      <ul>
        <li>
          <button onClick={handleSignIn}>Sign In</button>
        </li>
        <li>
          <button onClick={handleSignUp}>Sign Up</button>
        </li>
      </ul>
    </div>
  );
};

export default NavTabs;
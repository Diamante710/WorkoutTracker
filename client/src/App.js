import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NavTabs from './NavTabs';
import SignupForm from './SignupForm';
import UserHomepage from './UserHomepage';
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <NavTabs />

        <Switch>
          <Route path="/signupform" component={SignupForm} />
          <Route path="/user-homepage" component={UserHomepage} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
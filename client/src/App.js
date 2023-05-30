import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NavTabs from './components/NavTabs';
import SignupForm from '../src/components/SignupForm';
import UserHomepage from '../src/components/UserHomepage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <NavTabs />

        <Switch>
          <Route path="/SignupForm" component={SignupForm} />
          <Route path="/UserHomepage" component={UserHomepage} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
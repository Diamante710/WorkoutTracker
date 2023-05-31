import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Header from './components/Header';
import NavTabs from './components/Navtabs';
import SignupForm from '../src/components/SignupForm';
import UserHomepage from '../src/components/UserHomepage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <NavTabs />

        <Routes>
          <Route path="/SignupForm" component={SignupForm} />
          <Route path="/UserHomepage" component={UserHomepage} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

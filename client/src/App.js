import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavTabs from './components/Navtabs';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import UserHomepage from './components/UserHomepage';
import { ApolloClient,InMemoryCache, ApolloProvider } from '@apollo/client';
// import { ThemeProvider, Global } from '@emotion/react';


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    // <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
    <Router>
      
      <div>
        <Header />
        <NavTabs />

          <Routes>
            <Route
              path="/UserHomepage"
              element={<UserHomepage />} />

            <Route
              path="/SignupForm"
              element={<SignupForm />}
            />

            <Route
              path="/LoginForm"
              element={<LoginForm />}
            />

          </Routes>
       
      </div>

    </Router>
    </ApolloProvider>
    // </ThemeProvider>
  );
};

export default App;

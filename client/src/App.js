import React from 'react';
// import  from '../src/pages/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Routes>
          <Route
            path='/'
            element={}
          />
          <Route
            path='/saved'
            element={}
          />
          <Route
            path='*'
            element={<h1 className="display-2">Wrong Page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;


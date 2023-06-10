import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import NavTabs from './components/Navtabs';
import UserPage from '../src/components/UserPage';
import SavedExercise from '../src/pages/SavedExecises';
import SearchExercise from '../src/pages/SearchExercise';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <NavTabs/>
        <Routes>
          <Route path="/" element={<SearchExercise/>}/>
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/saved" element={<SavedExercise/>}/>
          <Route
            path='*'
            element={<h1 className="display-2">Wrong Page!</h1>}
          />
        </Routes>
        </>
    </Router>
    </ApolloProvider>
  );
};

export default App;

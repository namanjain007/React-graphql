import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/Addbook';
import { ApolloClient, ApolloProvider , InMemoryCache } from '@apollo/client';
import "./index.css";

const client  = new ApolloClient({
  uri : "http://localhost:5000/graphql" ,
  cache : new InMemoryCache()
});

class App extends React.Component{
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Naman's Reading List</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

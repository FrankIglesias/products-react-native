import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://graphql-training-wolox.herokuapp.com/',
});

export default client;

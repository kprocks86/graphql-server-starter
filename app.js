import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import resolvers from './resolvers';
import typeDefs from './schema';

const app = express();

const graphqlEndpoint = '/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});


server.applyMiddleware({ app });
// eslint-disable-next-line no-console
app.listen({ port: 8081 }, () => console.log(`🚀 Server ready at http://localhost:8081${graphqlEndpoint}`));

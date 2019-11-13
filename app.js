import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { getUser } from './helper';
import models from './models';

const app = express();

const graphqlEndpoint = '/graphql';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('We are connected to Database'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
  context: async ({ req }) => {
    const me = await getUser(req);
    return {
      me,
      model: models,
    };
  },
});


server.applyMiddleware({ app });
app.listen({ port: 8081 }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:8081${graphqlEndpoint}`);
  mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
});

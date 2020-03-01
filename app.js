import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { getUser } from './helper';
import models from './models';
import mongoose from 'mongoose';
import morgan from 'morgan'
import path from 'path';

const app = express();

const graphqlEndpoint = '/graphql';
const dbName = 'test';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen({ port: 8081 }, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:8081${graphqlEndpoint}`);
  });

});

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

app.use(morgan('tiny'))

server.applyMiddleware({ app });
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

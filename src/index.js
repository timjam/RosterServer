import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const app = express();

app.use(cors());

const server = new ApolloServer({});

server.applyMiddleware({
  app,
  path: '/graphql'
});

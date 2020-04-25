import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const { API_PORT = 9000, NODE_ENV = "development" } = process.env;
  const {
    MONGO_INITDB_ROOT_USERNAME: username,
    MONGO_INITDB_ROOT_PASSWORD: password,
    MONGO_INITDB_DATABASE: dbname,
  } = process.env;

  const app = express();
  app.disable("x-powered-by");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app, path: "/" });

  await mongoose
    .connect(
      `mongodb://${username}:${password}@mongo:27017/${dbname}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

  app.listen({ port: API_PORT }, () => {
    console.log(
      `Server is ready at http://localhost:${API_PORT}/${server.graphqlPath}`
    );
  });
};

startServer();

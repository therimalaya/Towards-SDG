import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const { APP_PORT = 9000, NODE_ENV = "development" } = process.env;
  const {
    MONGO_INITDB_ROOT_USERNAME: username,
    MONGO_INITDB_ROOT_PASSWORD: password,
    MONGO_INITDB_DATABASE: dbname,
  } = process.env;
  const IN_PROD = NODE_ENV === "production";

  const app = express();
  app.disable("x-powered-by");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: {
    //   settings: {
    //     "request.credentials": "same-origin",
    //   },
    // },
    // subscriptions: {
    //   path: "/api",
    // },
  });

  server.applyMiddleware({ app, path: "/" });

  await mongoose.connect(
    `mongodb://${username}:${password}@mongo:27017/${dbname}?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  app.listen({ port: APP_PORT }, () => {
    console.log(
      `Server is ready at http://localhost:${APP_PORT}/${server.graphqlPath}`
    );
  });
};

startServer();

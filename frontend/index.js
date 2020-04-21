import express from "express";

const startServer = async () => {
  const { APP_PORT = 3000, NODE_ENV = "development" } = process.env;
  const IN_PROD = NODE_ENV === "production";
  const app = express();
  app.use(express.static("home/"));
  app.listen({ port: APP_PORT }, () => {
    console.log(`Server is ready at http://localhost:${APP_PORT}`);
  });
};

startServer();

ARG API_PORT=4000
ARG NODE_ENV="production"

FROM node:12-alpine
WORKDIR /app
COPY ./package.json .
RUN yarn install
COPY . .
EXPOSE ${API_PORT}
ENTRYPOINT [ "yarn", "start"]
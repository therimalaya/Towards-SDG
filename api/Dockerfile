FROM node:12-alpine
WORKDIR /app
COPY ./package.json .
RUN yarn install
ENV APP_PORT=9000
ENV NODE_ENV="production"
COPY . .
EXPOSE ${APP_PORT}
ENTRYPOINT [ "yarn", "start"]
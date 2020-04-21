FROM node:12-alpine as builder

WORKDIR /app
COPY package.json .
RUN yarn install

COPY research ./research
RUN cd research && yarn install && cd ..
COPY education ./education
RUN cd education && yarn install && cd ..
COPY home ./home
RUN yarn run build && yarn run prepare && yarn run deploy

FROM nginx:1.16.0-alpine
COPY --from=builder /app/home /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
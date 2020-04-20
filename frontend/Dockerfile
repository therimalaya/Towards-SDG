FROM node:12-alpine as builder

WORKDIR /app
COPY . /app
RUN cd education && yarn install && yarn build && mv build ../home/education && cd ..
RUN cd education && yarn install && yarn build && mv build ../home/research && cd ..

FROM nginx:1.16.0-alpine
COPY --from=builder /app/home /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
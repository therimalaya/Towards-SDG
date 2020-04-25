# Stage 1: Building React App
FROM node:12-alpine as builder

WORKDIR /app

COPY research ./research
RUN cd research \
    && yarn install \
    && yarn build \
    && cd ..
COPY education ./education
RUN cd education \
    && yarn install \
    && yarn build \
    && cd ..
COPY home ./home
RUN mv research/build home/research \
    && mv education/build home/education

# Stage 2 (API and Release): Move the build app and serve it using nginx
FROM nginx:1.16.0-alpine as release
COPY --from=builder \
    /app/home /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

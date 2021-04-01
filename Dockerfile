# Build
FROM node:14.16 AS build-env
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

# Serve
FROM nginx:1.18 AS serve-env

COPY --from=build-env /usr/src/app/dist /usr/share/nginx/html

# Build
FROM node:14.16 AS build-env
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve
FROM nginx:1.18 AS serve-env

COPY deploy/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /usr/src/app/dist /usr/share/nginx/html

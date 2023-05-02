FROM node:14.15.4 AS build

RUN mkdir -p app
WORKDIR /app

ADD ./src/ src/
ADD ./public/ public/
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

ENTRYPOINT [ "npm", "start"]
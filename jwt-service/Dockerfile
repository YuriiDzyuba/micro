FROM node:16.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.6.0
RUN npm install

COPY . .
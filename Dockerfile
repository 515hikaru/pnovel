FROM node:12.16.3

ENV VERSION 0.1.0

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN yarn && \
    yarn run generate && \
    yarn run build

RUN yarn start

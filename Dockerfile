FROM node:18.6.0 as node


RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm ci && \
    npm run generate && \
    npm run build

FROM node:18.6-alpine
ENV VERSION 0.7.8
RUN mkdir -p /app/dist
RUN mkdir -p /app/bin
COPY --from=node /app/dist/main.js /app/dist/main.js
COPY --from=node /app/bin/pnovel.js /app/bin/pnovel.js
RUN ln -s /app/bin/pnovel.js /usr/local/bin/pnovel

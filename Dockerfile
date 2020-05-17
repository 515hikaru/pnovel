FROM node:12.16.3 as node

ENV VERSION 0.1.0

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN yarn && \
    yarn run generate && \
    yarn run build

FROM node:12.16.3-stretch
RUN mkdir -p /app/dist
RUN mkdir -p /app/bin
COPY --from=node /app/dist/main.js /app/dist/main.js
COPY --from=node /app/bin/pnovel.js /app/bin/pnovel.js
RUN ln -s /app/bin/pnovel.js /usr/local/bin/pnovel

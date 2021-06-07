FROM ubuntu:20.04 AS ui-build
RUN apt-get update
RUN apt install nodejs npm
RUN npm install --global yarn
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN mkdir ./client
COPY client/ ./client
RUN cd client && yarn install && yarn build



FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/build ./my-app/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/server.js ./api/

EXPOSE 80

CMD ["node", "./api/server.js"]
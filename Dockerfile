FROM ubuntu:20.04
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends nodejs npm
RUN npm install --global yarn
RUN apt-get install -y imagemagick
RUN apt-get install -y graphicsmagick
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install imagemagick
RUN npm install gm
RUN cd client && yarn install
EXPOSE 3000
CMD ["./startApp.sh"]
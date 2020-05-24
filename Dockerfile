FROM node:12.16.3-alpine

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app
COPY . /usr/src/app

# RUN cd /usr/src/app

EXPOSE 6000

CMD ["npm", "start"]
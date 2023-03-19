FROM node:19.8.1-alpine
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 1337

ENTRYPOINT ["node"]

CMD ["index.js"]

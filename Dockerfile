FROM node:5.10
MAINTAINER Mark Myers <marcusmyers@gmail.com>

ADD . /app

WORKDIR /app

RUN cp env.example ./.env && npm install

EXPOSE 3000

CMD ["node", "app.js"]

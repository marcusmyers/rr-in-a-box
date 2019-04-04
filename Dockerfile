FROM node
MAINTAINER Mark Myers <marcusmyers@gmail.com>

ADD . /app

WORKDIR /app

RUN cp env.example ./.env && npm install

EXPOSE 3000

CMD ["node", "app.js"]

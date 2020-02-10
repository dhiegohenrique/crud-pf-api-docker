FROM node:carbon-wheezy

RUN mkdir app

RUN rm -rf node_modules

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

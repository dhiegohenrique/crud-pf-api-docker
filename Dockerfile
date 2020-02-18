FROM node:12.2.0-alpine
RUN mkdir app
RUN rm -rf node_modules
WORKDIR /app
COPY package*.json ./
RUN npm i && npm cache clean --force

COPY . .

EXPOSE 3000
CMD [ "npm", "start"]

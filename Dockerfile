FROM node:latest

WORKDIR /app-front

COPY . .

RUN npm install

CMD ["npm", "start"]
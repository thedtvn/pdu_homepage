FROM node:slim

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN npm install && npm run build

WORKDIR /app/backend

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
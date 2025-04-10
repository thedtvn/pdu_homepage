FROM node:slim

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN npm install && npm run build

WORKDIR /app/backend

RUN cd backend && npm install

EXPOSE 3000

WORKDIR /app/backend

CMD ["npm", "start"]
FROM node:alpine-20

WORKDIR /app

COPY . .

RUN cd frontend && npm install && npm run build

RUN cd backend && npm install

RUN npm install && npm run build

EXPOSE 3000

WORKDIR /app/backend

CMD ["npm", "start"]
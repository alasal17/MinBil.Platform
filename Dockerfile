
FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . ./

CMD ["npm", "start"]
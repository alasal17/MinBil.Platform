FROM node:18


COPY package*.json ./

RUN npm install  --force

COPY . .

EXPOSE 3000
CMD [ "npm run dev" ]
FROM node:16


COPY package.json .

<<<<<<< Updated upstream
RUN npm install
=======
RUN npm install --legacy-peer-deps

COPY . .


CMD [ "npm run dev" ]
>>>>>>> Stashed changes

COPY . .

EXPOSE 3000
CMD [ "npm run dev" ]
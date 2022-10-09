FROM node:latest

# Create app directory
WORKDIR /app

COPY package.json .
# RUN sudo apt install xsel
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
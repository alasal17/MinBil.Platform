# FROM node:16



# COPY package*.json ./
# # RUN sudo apt install xsel
# RUN npm install --legacy-peer-deps
# # RUN npm install webpack-dev-middleware --force
# COPY . .

# EXPOSE 3000
# CMD [ "npm run dev" ]



FROM node:16


COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm audit fix --force
COPY . .


CMD [ "npm run dev" ]

# FROM node:15.8.0-alpine3.10

# WORKDIR /app
# ADD server.js package.json ./

# RUN npm install -g npm@8.19.2 --force
# RUN npm install express --force

# RUN npm install --legacy-peer-deps
# CMD node server.js
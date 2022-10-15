# FROM node:16



# COPY package*.json ./
# # RUN sudo apt install xsel
# RUN npm install --legacy-peer-deps
# # RUN npm install webpack-dev-middleware --force
# COPY . .

# EXPOSE 3000
# CMD [ "npm run dev" ]



FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

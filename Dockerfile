# FROM node:16



# COPY package*.json ./
# # RUN sudo apt install xsel
# RUN npm install --legacy-peer-deps
# # RUN npm install webpack-dev-middleware --force
# COPY . .

# EXPOSE 3000
# CMD [ "npm run dev" ]



# FROM node:16

# # Create app directory

# WORKDIR /frontend
# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package.json /frontend


# RUN npm cache clear --force
# # RUN rm package-lock.json --force
# # RUN rm -r node_modules --force
# RUN npm install --legacy-peer-deps
# RUN npm install -g serve --force

# # Bundle app source
# COPY . .
# EXPOSE 3001

# CMD ["npm", "run", "dev"]


# FROM node:14-alpine

# WORKDIR /app

# COPY package.json ./



# RUN npm install --frozen-lockfile

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]


# pull the official base image
FROM node:alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]
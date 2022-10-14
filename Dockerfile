FROM node:16



COPY package*.json ./
# RUN sudo apt install xsel
RUN npm install --legacy-peer-deps
# RUN npm install webpack-dev-middleware --force
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]



# FROM node:16


# COPY package*.json ./

# RUN npm install 

# COPY . .

# EXPOSE 3000
# CMD [ "npm run dev" ]
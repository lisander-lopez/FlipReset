FROM ubuntu:18.04 

# INSTALL WGET FOR GO, GIT FOR GO PLUGINS, NPM FOR REACT
RUN apt-get update --fix-missing
RUN apt-get install -y nodejs 
RUN apt-get install -y npm

COPY . .

# GET DEPENDENCIES FOR GO/NPM
WORKDIR /project/flip-reset
RUN npm install -g npm
RUN npm install
RUN npm run build


EXPOSE 3000

# RUN SERVER
CMD ["npm", "start"]
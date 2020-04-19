FROM ubuntu:18.04 

RUN apt-get update --fix-missing
RUN apt-get install -y nodejs 
RUN apt-get install -y npm

COPY . .

WORKDIR /server
RUN npm install -g npm
RUN npm install
RUN npm run build


EXPOSE 3060

# RUN SERVER
CMD ["npm", "start"]
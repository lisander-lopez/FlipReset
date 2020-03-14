FROM ubuntu:18.04 

# INSTALL WGET FOR GO, GIT FOR GO PLUGINS, NPM FOR REACT
RUN apt-get update --fix-missing
RUN apt-get install -y build-essential wget
RUN apt-get install -y git
RUN apt-get install -y nodejs 
RUN apt-get install -y npm

# DOWNLOAD AND INSTALL GO
RUN cd /tmp
RUN wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz
RUN tar -xvf go1.11.linux-amd64.tar.gz
RUN mv go /usr/local

# SET UP GO ROOT AND GOPATH AND ADD BOTH TO PATH
ENV GOROOT=/usr/local/go
ENV GOPATH=$HOME/go
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH

# CLONE GIN AND CONTRIB FROM GITHUB
WORKDIR $GOPATH/src/github.com
RUN git clone https://github.com/gin-gonic/gin.git
RUN git clone https://github.com/gin-gonic/contrib.git

# COPY PROJECT INTO GOPATH
WORKDIR $GOPATH/src
COPY . .

# GET DEPENDENCIES FOR GO/NPM
WORKDIR $GOPATH/src/flipre/project/flip-reset
RUN npm update
WORKDIR $GOPATH/src/flipre/project/server
RUN go get

# EXPOST PORT TO ACCESS CONTAINER
EXPOSE 8000

# RUN SERVER
CMD ["go", "run", "main.go"]
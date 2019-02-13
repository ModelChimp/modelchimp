# base image
FROM node:11.5.0

# set working directory
RUN mkdir /frontend
WORKDIR /frontend

# add `/frontend/.bin` to $PATH
ENV PATH /frontend/.bin:$PATH

# install and cache app dependencies
COPY package.json /frontend/package.json

RUN apt-get update && apt-get install libglu1 -y

RUN npm install

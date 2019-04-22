# base image
FROM node:11.5.0

# set working directory
RUN mkdir /frontend
WORKDIR /frontend

# add `/frontend/.bin` to $PATH
ENV PATH /frontend/.bin:$PATH

# install and cache app dependencies
COPY . /frontend/

RUN apt-get update && apt-get install libglu1 -y --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install && npm run build

EXPOSE 3000

# what to build on
FROM node:8.9-alpine

# set up, make a directory in the image /app and declare it the working directory
# copy EVERYTHING in current directory (COVID-19) into /app working directory
RUN mkdir /app
WORKDIR /app
COPY . /app

# install dependencies
RUN npm install

# port for the container to talk to
EXPOSE 3111

CMD ["npm", "build"]
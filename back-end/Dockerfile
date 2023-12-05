FROM node:18.18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# These extra installations prevent errors with these modules not being included
# Install pkg-config
RUN apk add --no-cache pkgconfig pixman-dev cairo-dev pango-dev
# Install Python
RUN apk add --no-cache python3 make g++
ENV PYTHON /usr/bin/python3

RUN npm install

COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]
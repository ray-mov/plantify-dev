FROM node:alpine

WORKDIR /src
COPY package.json .
RUN npm i --omit=dev
COPY . .

CMD ["npm","run","dev"]
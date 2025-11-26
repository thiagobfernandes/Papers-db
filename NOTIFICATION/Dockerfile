FROM node:22  AS build

COPY src /app/src
COPY package.json package-lock.json* tsconfig.json  /app

WORKDIR /app

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]
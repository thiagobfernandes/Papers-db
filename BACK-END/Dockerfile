FROM node:22-slim AS build

COPY src /app/src
COPY upload /app/upload
COPY package.json package-lock.json* tsconfig.json  /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
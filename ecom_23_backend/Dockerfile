FROM node:12.18.1

ENV NODE_ENV=production
ENV PORT=4010

WORKDIR /app

COPY ["package.json", "package-lock.json*","tsconfig.json", "./"]

COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 4010:4010

CMD [ "node", "dist/app.js" ]
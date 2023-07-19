# Dockerfile for create react app
#
FROM node:14.18.3

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 3000:3000

CMD  ["npm", "start"]

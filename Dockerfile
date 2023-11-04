# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["node", "build/scripts/start.js"]
EXPOSE 80

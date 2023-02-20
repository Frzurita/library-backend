FROM node:16 AS build
LABEL maintainer="library devs"

WORKDIR /app
COPY ./ ./
RUN npm install && npm run build

FROM node:16-alpine

WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
RUN npm install

CMD ["node", "dist/apps/main.js"]
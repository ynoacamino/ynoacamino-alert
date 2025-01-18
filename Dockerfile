###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:lts-alpine AS development
WORKDIR /usr/src/app
RUN apk add --no-cache \
    openssl \
    libc6-compat
RUN npm install -g node-gyp && npm cache clean --force
COPY --chown=node:node package*.json ./
RUN npm i
COPY --chown=node:node . .
# USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
RUN apk add --no-cache \
    openssl \
    libc6-compat
RUN npm install -g node-gyp && npm cache clean --force
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build:prisma
ENV NODE_ENV=production
RUN npm i --only=production && npm cache clean --force
# USER node

EXPOSE 3000

CMD [ "npm", "run", "start:prisma"]

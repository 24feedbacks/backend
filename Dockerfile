FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

COPY .env .

RUN yarn build

FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000
CMD [ "node", "dist/index.js" ]
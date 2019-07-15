FROM node:10.15-slim

EXPOSE 8080

WORKDIR /src/app

RUN apt-get update && apt-get install -y build-essential && rm -r /var/lib/apt/lists/*

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# for docker caching purposes
COPY ./package.json ./package-lock.json ./
RUN npm i

COPY . .

RUN npm run-script build && make clis

ENV NODE_ENV=production
ENTRYPOINT ["/tini", "--"]
CMD ["node", "dist/server/index.js"]


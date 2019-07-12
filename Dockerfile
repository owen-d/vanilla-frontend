FROM node:10.15-slim

ENV NODE_ENV=production
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

# For some reason, tsc does not respect the tsconfig in docker.
# Running `npx tsc` produces no output and exits with a 0 code.
# Therefore we try and mimic the required configs even though it's susceptible to config drift
RUN npm run-script build && \
  npx tsc --module commonjs --esModuleInterop --outDir dist $(find src -name '*.ts')

ENTRYPOINT ["/tini", "--"]
CMD ["node", "dist/server/index.js"]


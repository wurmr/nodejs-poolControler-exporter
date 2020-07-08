FROM node:lts as builder
WORKDIR /WORK
COPY package*.json ./
RUN npm ci
COPY * ./
RUN npm run build

FROM node:lts-alpine
WORKDIR /usr/lib/nodejs-poolController-exporter
COPY --from=builder /WORK/dist ./
COPY --from=builder /WORK/node_modules ./node_modules
COPY --from=builder /WORK/LICENSE .
EXPOSE 9100
ENTRYPOINT ["node", "server.js"]
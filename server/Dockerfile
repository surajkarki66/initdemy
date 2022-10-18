FROM node:16-alpine as build
RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN npm run p-gen
RUN npm run build

# # ------------------production -------------------

FROM node:16-alpine as production
RUN npm install -g pnpm


RUN addgroup -g 1001 -S user_group
RUN adduser -S application -u 1001

WORKDIR /app

COPY --from=build --chown=application:user_group /app/.env.docker ./.env
COPY --from=build --chown=application:user_group /app/package.json .
COPY --from=build --chown=application:user_group /app/pnpm-lock.yaml .
COPY --from=build --chown=application:user_group /app/prisma ./prisma
COPY --from=build --chown=application:user_group /app/node_modules/ ./node_modules/
COPY --from=build --chown=application:user_group /app/dist/ ./dist/

CMD ["/bin/sh", "-c", "npm run p-mg-prod;node dist/app.js"]
FROM node:16-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
RUN rm -rf node_modules
RUN npm install --omit=dev

FROM node:16-alpine as production
ENV NODE_ENV production

RUN addgroup -g 1001 -S user_group
RUN adduser -S application -u 1001

WORKDIR /app

COPY --from=build --chown=application:user_group /app/node_modules ./node_modules
COPY --from=build --chown=application:user_group /app/package.json ./
COPY --from=build --chown=application:user_group /app/package-lock.json ./
COPY --from=build --chown=application:user_group /app/public ./public
COPY --from=build --chown=application:user_group /app/.next ./.next

CMD ["npm", "start"]
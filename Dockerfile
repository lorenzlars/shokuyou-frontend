FROM node as build

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm run build

FROM caddy:alpine as serve

COPY --from=build /app/dist /usr/share/caddy

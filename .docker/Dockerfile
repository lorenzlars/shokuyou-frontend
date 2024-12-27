FROM node as build

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM caddy:alpine as serve

COPY /.docker/root/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy

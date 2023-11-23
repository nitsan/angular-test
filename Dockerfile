FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./

RUN npm ci --prefer-offline --no-audit --no-fund

COPY src /app/src
COPY [".npmrc", "angular.json", "info.json", "tsconfig.app.json", "tsconfig.json", "/app/"]

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist/angular-test /usr/share/nginx/html

EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

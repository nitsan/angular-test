FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./

RUN npm ci --prefer-offline --no-audit --no-fund

COPY src /app/src
COPY [".npmrc", "angular.json", "info.json", "tsconfig.app.json", "tsconfig.json", "/app/"]

RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY angular-test.conf /etc/nginx/conf.d/angular-test.conf
COPY --from=builder /app/dist/angular-test /usr/share/nginx/html

EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

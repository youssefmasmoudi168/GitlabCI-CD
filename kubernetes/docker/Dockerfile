FROM nexus.sifast.com:8087/node:18 AS frontend

WORKDIR /app/frontend

ARG env

# Installing node packages
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Running build
RUN npm ci && npm cache clean --force

COPY ./frontend/ ./

COPY kubernetes/docker/config/.env-frontend-${env} .env.development

# Build project
#RUN npm run build 

EXPOSE 3000
CMD npm start

# Stage 
#FROM nexus.sifast.com:8087/nginx:stable-alpine AS frontend

#WORKDIR /usr/share/nginx/html

#COPY --from=build /app/frontend/build /usr/share/nginx/html

#COPY kubernetes/docker/config/nginx.conf /etc/nginx/conf.d/default.conf


FROM nexus.sifast.com:8087/php:8.1-fpm AS backend

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Installing php extensions and composer

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions @composer intl opcache pdo openssl json pdo_mysql apcu zip xdebug

# Installing Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash && apt install -y symfony-cli

WORKDIR /app/backend

ARG env

EXPOSE 8000

COPY kubernetes/docker/config/.env-${env} .env

RUN chmod -R 777 .

#Installing composer dependencies
COPY ./backend/composer.json ./

RUN composer install --prefer-dist

RUN composer dump-autoload --optimize

COPY ./backend ./

COPY kubernetes/docker/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT /docker-entrypoint.sh

FROM php:8.1-fpm AS backend

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions @composer intl opcache pdo openssl json pdo_mysql apcu zip xdebug

RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash && apt install -y symfony-cli

WORKDIR /app/backend

RUN chmod -R 777 .

COPY ./backend/composer.json ./

RUN composer install --prefer-dist

RUN composer dump-autoload --optimize

COPY ./backend ./

CMD php bin/console doctrine:database:create --if-not-exists; php bin/console doctrine:migrations:migrate --no-interaction; php bin/console lexik:jwt:generate-keypair --overwrite; symfony server:start
# Stage 1: Frontend (React.ts)
FROM node:18 AS frontend

WORKDIR /app/frontend

# Copy and install dependencies for frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci && npm cache clean --force
COPY frontend ./
COPY ./.env-frontend-pgt .env.development
EXPOSE 3000

CMD ["npm", "start" ,"--host=0.0.0.0"]

# Stage 2: Backend (Symfony)
FROM php:8.1-fpm AS backend



# Install PHP extensions and Symfony CLI
RUN apt-get update && apt-get install -y libzip-dev zip unzip && \
    docker-php-ext-configure zip && \
    docker-php-ext-install zip pdo pdo_mysql

# Install PHP extensions and Symfony CLI
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions @composer intl opcache pdo openssl json pdo_mysql apcu zip xdebug

 RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash && apt-get install -y symfony-cli

WORKDIR /app/backend

# Copy and install dependencies for backend
COPY backend/composer.json backend/composer.lock ./
RUN composer install --prefer-dist --no-scripts

#  Run necessary commands for the backend
# CMD php bin/console doctrine:database:create --if-not-exists; \
#     php bin/console doctrine:migrations:migrate --no-interaction; \
#     php bin/console lexik:jwt:generate-keypair --overwrite; \
#     symfony server:start

ARG APP_ENV=dev
ARG FRONTEND_LOCAL_PORT
ARG BACKEND_LOCAL_PORT
ARG PMA_LOCAL_PORT
ARG MYSQL_LOCAL_PORT

ENV APP_ENV=${APP_ENV}
ENV FRONTEND_LOCAL_PORT=${FRONTEND_LOCAL_PORT}
ENV BACKEND_LOCAL_PORT=${BACKEND_LOCAL_PORT}
ENV PMA_LOCAL_PORT=${PMA_LOCAL_PORT}
ENV MYSQL_LOCAL_PORT=${MYSQL_LOCAL_PORT}

EXPOSE ${FRONTEND_LOCAL_PORT}
EXPOSE ${BACKEND_LOCAL_PORT}
EXPOSE ${PMA_LOCAL_PORT}
EXPOSE ${MYSQL_LOCAL_PORT}

EXPOSE 8000
COPY ./.env-pgt .env
# Start the Symfony server
CMD ["symfony", "server:start","--port=8000"]

# # Final Stage: Combine frontend and backend images
# FROM nginx:latest

# # Copy frontend build from the "frontend" stage
# COPY --from=frontend /app/frontend /usr/share/nginx/html

# # Copy backend build from the "backend" stage
# COPY --from=backend /app/backend /usr/share/nginx/html/api

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
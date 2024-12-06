FROM node:18 AS frontend

WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm ci && npm cache clean --force

COPY ./frontend/ ./

CMD npm start 
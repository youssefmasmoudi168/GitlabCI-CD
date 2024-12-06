#!/bin/bash

# Define a function to log messages to a file
log() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") $1" >>install.log
}

while getops ":h" option; do
  case $option in
  h)
    Help
    exit;;
  esac
done

log "Loading environment variables from .env file"
export $(grep -v '^#' .env | xargs)

if (nc -zv 127.0.0.1 $BACKEND_LOCAL_PORT || nc -zv 0.0.0.0 $BACKEND_LOCAL_PORT || nc -zv 127.0.0.1 $FRONTEND_LOCAL_PORT || nc -zv 0.0.0.0 $FRONTEND_LOCAL_PORT); then
  log "Killing processes using ports $BACKEND_LOCAL_PORT and $FRONTEND_LOCAL_PORT"
  sudo kill -9 $(sudo lsof -t -i:$BACKEND_LOCAL_PORT)
  sudo kill -9 $(sudo lsof -t -i:$FRONTEND_LOCAL_PORT)
else
  log "No processes using specified ports found"
fi

log "Starting Docker containers"
docker compose up -d --build || {
  log "Failed to start Docker containers"
  exit 1
}

# php bin/console doctrine:database:create && php bin/console doctrine:migrations:migrate && php bin/console lexik:jwt:generate-keypair --overwrite

log "Installation complete"

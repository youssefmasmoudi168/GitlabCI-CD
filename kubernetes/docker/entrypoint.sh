#!/bin/bash

php bin/console doctrine:migrations:migrate --no-interaction

php bin/console lexik:jwt:generate-keypair

symfony server:start
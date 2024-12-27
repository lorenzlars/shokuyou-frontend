# Heroku

## Frontend

### Hosting setup
https://devcenter.heroku.com/articles/deploying-php
https://devcenter.heroku.com/articles/custom-php-settings
https://github.com/heroku/heroku-buildpack-php/blob/main/conf/nginx/default_include.conf.php

1. Create `composer.json` with content `{}` to let heroku recognize the app as PHP app.
2. Create a Nginx `nginx_app.conf` config to configure the SPA App `index.html` redirects and the serving folder.
3. Create a `Procfile` to make use of the Nginx config: `web: heroku-php-nginx -C nginx_app.conf`
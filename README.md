# Project: Mesto
### Tech Stack
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![Mongoose](https://img.shields.io/badge/-Mongoose-black?style=flat-square&logo=mongoose)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![Stylelint](https://img.shields.io/badge/-Stylelint-black?style=flat-square&logo=stylelint)
![BEM](https://img.shields.io/badge/-BEM-black?style=flat-square&logo=bem)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![Jest](https://img.shields.io/badge/-Jest-black?style=flat-square&logo=jest)
![Netlify](https://img.shields.io/badge/-Netlify-black?style=flat-square&logo=netlify)

* framer-motion
* uuidv4
* classnames

### About
* Photo posting service.
* JS CRA Version 0.2.0
* TS CRA Version 1.1.1
* TS Webpack Version 2.1.1
* TS RTK Webpack Version 3.1.1
* TS RTK Webpack SW Version 3.2.1
* Dark&light theme

## Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/cba6d7c5-ac20-450a-bbc1-da1e599e0123/deploy-status)](https://app.netlify.com/sites/whimsical-sprite-5d5e95/deploys)
[![Netlify](https://img.shields.io/badge/-Netlify-black?style=flat-square&logo=netlify)](https://whimsical-sprite-5d5e95.netlify.app/)

![Alt-text](https://github.com/bmazurme/mesto-react/blob/main/src/images/mesto.png "demo")

##### Created by Yandex.Practicum

### Installation
```bash
# clone the repository on your computer
$ git clone git@github.com:bmazurme/react-mesto-auth.git

# install dependencies
$ npm install

# run dev mode
$ npm run dev

# build project
$ npm run build

# clear project
$ npm run clear

# run eslint
$ npm run eslint

# launch
$ npm start
```

Implemented features:
- [X] User registration, authorization
- [X] Add, edit user information
- [X] Add, delete card, like and dislike
- [X] Popup, modal
- [X] Display the number of likes of the card
- [X] Form validation, react-hook-form
- [X] Redux, RTK Query
- [X] Axios
- [X] React error boundaries
- [X] TypeScript, Webpack
- [X] Express static
- [X] Docker
- [X] Service worker
- [X] CI/CD GitHub Actions
- [X] Dark&light theme
- [ ] RU/EN lang
- [ ] Tests, jest, cypress
- [ ] API, express
- [ ] Oauth, yandex

### Docker

```bash
$ docker-compose build

$ docker-compose up

$ docker-compose stop

$ docker system prune -a

$ docker push cr.yandex/${REGISTRY_ID}/mesto:latest

$ docker pull cr.yandex/${REGISTRY_ID}/mesto:latest

$ docker run cr.yandex/${REGISTRY_ID}/mesto:latest

$ docker run -d -p 80:3000 cr.yandex/${REGISTRY_ID}/mesto:latest

# [https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin](https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin)
$ docker exec -it container_ID_or_name /bin/bash

```

### NGINX

```bash
$ sudo apt update

$ sudo apt install -y nginx

$ sudo ufw allow 'Nginx Full'

$ sudo ufw allow OpenSSH

$ sudo ufw enable

$ sudo systemctl enable --now nginx

$ sudo nano /etc/nginx/sites-available/default

$ sudo nginx -t

$ sudo systemctl reload nginx
```

### SSL

```bash
$ sudo apt update

$ sudo apt install -y certbot python3-certbot-nginx

$ sudo certbot --nginx

$ sudo systemctl reload nginx
```

### Figma
* [Link to Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Link to Figma - signup, signin](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?node-id=0%3A1)
* [Unicorn - Validator W3C](https://validator.w3.org/)
* [Font ”Inter"](https://rsms.me/inter/)
* [Optimize pictures](https://tinypng.com/)
* [Images](https://unsplash.com/)
* [Mesto VanillaJS](https://github.com/bmazurme/mesto)

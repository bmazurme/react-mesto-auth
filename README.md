# Project: Mesto
### Tech Stack
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![Stylelint](https://img.shields.io/badge/-Stylelint-black?style=flat-square&logo=stylelint)
![BEM](https://img.shields.io/badge/-BEM-black?style=flat-square&logo=bem)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![Jest](https://img.shields.io/badge/-Jest-black?style=flat-square&logo=jest)
![Netlify](https://img.shields.io/badge/-Netlify-black?style=flat-square&logo=netlify)

### About
* Photo posting service.
* JS CRA Version 0.2.0
* TS CRA Version 1.1.1
* TS Webpack Version 2.1.1
* TS RTK Webpack Version 3.1.1

Implemented features:
- [X] User registration
- [X] User authorization
- [X] Adding user information
- [X] Edit user profile
- [X] Uploading initial cards to servers
- [X] Delete card
- [X] Display the number of likes of the card
- [X] Like and dislike
- [X] Form Validation
- [X] RTK Query
- [X] Axios
- [X] react-hook-form
- [X] Express
- [ ] Docker
- [ ] React error boundaries
- [ ] Tests
- [ ] Service worker
- [ ] CI/CD


##### Created by Yandex.Practicum

## Demo
[GitHub Pages](https://bmazurme.github.io/react-mesto-auth)
[Netlify](https://whimsical-sprite-5d5e95.netlify.app/)

![Alt-text](https://github.com/bmazurme/mesto-react/blob/main/src/images/mesto.png "demo")

### Installation
Clone the repository on your computer:

`git clone git@github.com:bmazurme/react-mesto-auth.git`

Install dependencies: `npm install`

Run dev mode: `npm run dev`

Build project: `npm run build`

Clear project: `npm run clear`

Run eslint: `npm run eslint`

Launch: `npm start`

## Docker

`docker-compose build`

`docker-compose up`

`docker-compose stop`

`docker system prune -a`

`docker-compose build`

`docker compose push`

```
# on an M1 mac…

# --platform linux/amd64
```

Identify what is running in port 5432: `sudo lsof -i :5432`

Kill all the processes that are running under this port: `sudo kill -9 <pid>`

Run the command again to verify no process is running now: `sudo lsof -i :5432`

### SSL

`sudo apt update`

`sudo apt install -y certbot python3-certbot-nginx`

`sudo certbot --nginx`

`sudo systemctl reload nginx`

**Figma**
* [Link to Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Link to Figma - signup, signin](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?node-id=0%3A1)
* [Unicorn - Validator W3C](https://validator.w3.org/)
* [Font ”Inter"](https://rsms.me/inter/)
* [Optimize pictures](https://tinypng.com/)
* [Images](https://unsplash.com/)
* [Mesto VanillaJS](https://github.com/bmazurme/mesto)

# Ando

Front-end architecture for static web applications.

Ando currently powers Casper Storefront and Nightshade Design System.


## Getting Started


Ando uses Node `5.0.0`. If you have nvm installed, you set the correct version
engine from `.nvmrc`.

```sh
# check/set Node version
nvm use
# if you need to install 5.0.0
nvm install 5.0.0
nvm use
```


### Dependencies

You'll also need CLI for JSPM, Gulp, and json-server. These are best installed globally.

```sh
npm install jspm gulp json-server -g
```

Then run `npm install` to get packages. This will also run `postinstall` that installs jspm packages.


### Local Servers

Run `gulp` to start the server at port `3001`. Run `npm start` to kickoff the json server at `:3003`.

BrowserSync will watch and reload your JS, HTML, CSS and images.


## Directory Structure

At its most basic, Ando is a directory architecture and buid scripts. The core
of the code is in `app` folder. Compiled code is built to `dist` folder.

```
Ando/
└── app/
|    ├── assets/
|    │   ├── css/
|    │   ├──images/
|    │   ├── jspm_packages/
|    │   ├── js/
|    │   │   └── components/
|    │   │   └── pages/
|    │   │   └── templates.js
|    └── scss/
|    |    └── app.scss
|    └── templates/
|    └── views/
└── data/
|    |
└── dist/
|    |
└── test/
|
└── package.json
└── gulpfile.js
```

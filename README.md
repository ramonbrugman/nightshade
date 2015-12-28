# Ando

Front-end architecture for static web applications.

Ando currently powers Casper Storefront and Nightshade Design System.


## Getting Started

Ando use Node `5.3.0`. If you have nvm installed, you set the correct version
engine from `.nvmrc`. 

```sh
# check/set Node version
nvm use
# if you need to install 5.3.0
nvm install 5.3.0
nvm use
```


You'll also need CLI for [JSPM](), Gulp, and json-server for local data.

```sh
npm install jspm gulp json-server -g
```

Then run `gulp` to get started. This will run `npm install` and ensure you have
the latest packages.

BrowserSync will watch and reload your JS, HTML, CSS and images.


## Directory Structure

At its most basic, Ando is a directory architecture and buid scripts. The core
of the code is in `app` folder. Its contents are built to `dist` folder.  

```
Ando/
└── app/
|    ├── assets/
|    │   ├── css/
|    │   │   └── image1.png
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

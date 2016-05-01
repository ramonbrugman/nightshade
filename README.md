# Nightshade

Casper's system for designing and building interfaces for Casper.

## Getting Started

### Pre-requisites

1. Node
1. Gulp
1. JSPM


### Setup

#### 1. Set Node version 

Nightshade uses Node `5.10.1`. If you have nvm installed, you set the correct version
engine from `.nvmrc`.

```sh
# check/set Node version
nvm use
# if you need to install 5.0.0
nvm install 5.10.1
nvm use
```

#### 2. Install dependencies

```
npm install
```

#### 3. Setup .env

Adds local `.env` file to your repository. 

```
gulp setup
```

#### 4. Start local server

Stat a local webserver at an open port, usually `3000`. BrowserSync will watch and reload your environment when files change.

```
gulp
```


## Working with local data

```
npm install json-server -g
```

Run `npm start` to kickoff the json server at `:3003`.



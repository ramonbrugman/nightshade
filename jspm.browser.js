SystemJS.config({
  baseURL: "/",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "nightshade-core/": "node_modules/@casper/nightshade-core/src/",
    "assets/": "app/assets/js/",
    "views/": "app/views/"
  }
});

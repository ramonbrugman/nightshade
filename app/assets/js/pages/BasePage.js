import feature from 'viljamis/feature.js';

export const BasePage = {

init() {
  console.log(` base page activated `);

  if (feature.touch) {
    document.documentElement.classList.add(`touch`);
  } else {
    document.documentElement.classList.add(`no-touch`);
  }

  // Configure nunjucks
  nunjucks.configure(`app/modules/`, { autoescape: true, watch: false });

},

};

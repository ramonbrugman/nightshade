/**
 * @overview Base module to be imported as the foundation for all pages
 * @module BasePage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
*/

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

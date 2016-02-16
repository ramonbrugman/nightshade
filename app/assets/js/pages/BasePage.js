/**
 * @overview Base module to be imported as the foundation for all pages
 * @module BasePage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
*/

import feature from 'viljamis/feature.js';
import attachFastClick from 'fastclick';

export const BasePage = {

init() {
  console.log(` base page activated `);

  if (`touchAction` in document.body.style) {
    document.body.classList.add(`no-touch-delay`);
  } else {
    attachFastClick(document.body);
  }

  if (feature.touch) {
    document.documentElement.classList.add(`touch`);
  } else {
    document.documentElement.classList.add(`no-touch`);
  }

//  Configure nunjucks
const env = nunjucks.configure([`app/views/`, `node_modules/@casper/`], { autoescape: true, watch: false });

},

};

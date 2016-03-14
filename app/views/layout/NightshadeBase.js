/**
 * @overview Nightshade base module that is the foundation for the styleguide
 * @module NightshadeBase.js
*/

import { BasePage } from 'assets/js/pages/BasePage.js';
import { NavDrawer } from 'views/layout/NavDrawer.js';

export const NightshadeBase = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    NavDrawer.init();
  },

};

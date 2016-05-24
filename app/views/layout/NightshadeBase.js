/**
 * @overview Nightshade base module that is the foundation for the styleguide
 * @module NightshadeBase.js
*/

import { Core } from 'assets/Core.js';
import { NavDrawer } from 'views/layout/NavDrawer.js';

export const NightshadeBase = {

  init() {
    Core.init();
    NavDrawer.init();
  },

};

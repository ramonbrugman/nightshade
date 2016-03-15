/**
 * @overview Renders popovers patten page. Import PopOvers module
 * @module nightshade-core/src/popovers/PopoversPage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
 * @todo Modularize the init() method
*/

import { PatternPage } from 'views/layout/PatternPage.js';
import { Popovers } from 'nightshade-core/src/popovers/Popovers.js';

export const PopoversPage = {

  __proto__: PatternPage,

  init() {
    this.__proto__.init();
    Popovers.popover({togglerSelector: `.js-popover-toggle`, popoverSelector: `.js-popover`});
  },
};

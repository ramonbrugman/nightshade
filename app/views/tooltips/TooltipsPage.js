/**
 * @overview Renders tooltips patten page. Imports tooltips module
 * @module nightshade-core/src/popovers/TooltipsPage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
 * @todo Modularize the init() method
*/

import { PatternPage } from 'views/layout/PatternPage.js';
import { Tooltips } from 'nightshade-core/src/tooltips/Tooltips.js';

export const TooltipsPage = {

  __proto__: PatternPage,

  init() {
    this.__proto__.init();
    Tooltips.tooltip({togglerSelector: `.js-tooltip-toggle`, tooltipSelector: `.js-tooltip`});
  },
};

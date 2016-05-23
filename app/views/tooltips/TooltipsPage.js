/**
 * @overview Renders tooltips patten page. Imports tooltips module
 * @module nightshade-core/src/popovers/TooltipsPage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
 * @todo Modularize the init() method
*/

import { Tooltips } from 'nightshade-core/tooltips/Tooltips.js';

export const TooltipsPage = {

  init() {
    Tooltips.tooltip({togglerSelector: `.js-tooltip-toggle`, tooltipSelector: `.js-tooltip`});
  },
};

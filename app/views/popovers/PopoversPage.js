/**
 * @overview Renders popovers patten page. Import PopOvers module
 * @module nightshade-core/src/popovers/PopoversPage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
 * @todo Modularize the init() method
*/

import { Popovers } from 'nightshade-core/popovers/Popovers.js';

export const PopoversPage = {

  init() {
    Popovers.popover({togglerSelector: `.js-popover-toggle`, popoverSelector: `.js-popover`});
  },
};

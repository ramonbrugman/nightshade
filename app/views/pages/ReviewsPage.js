import { BasePage } from 'assets/js/pages/BasePage.js';
import { Popovers } from 'nightshade-core/src/popovers/Popovers.js';
import { Tooltips } from 'nightshade-core/src/tooltips/Tooltips.js';

export const ReviewsPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    Popovers.popover({togglerSelector: `.js-popover-toggle`, popoverSelector: `.js-popover`});
    Tooltips.tooltip({togglerSelector: `.js-tooltip-toggle`, tooltipSelector: `.js-tooltip`});
  },

};

import { BasePage } from 'assets/js/pages/BasePage.js';
import { Popovers } from 'modules/popovers/Popovers.js';

export const PopoversPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    Popovers.popover({togglerSelector: `.js-popover-toggle`, popoverSelector: `.js-popover`});
  },

};

import { BasePage } from 'assets/js/pages/BasePage.js';
import { Popovers } from 'modules/popovers/Popovers.js';

export const PopoversPage = {

  __proto__: BasePage,

  init() {
    Popovers.init({togglerSelector: `.js-popover-toggle`, popoverSelector: `.js-popover`});
  },

};

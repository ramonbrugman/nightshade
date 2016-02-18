/**
 * @overview Pattern page module for styleguide patterns
 * @module PatternPage.js
*/

import { BasePage } from 'assets/js/pages/BasePage.js';

export const PatternPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    this.setupCodeToggles();
  },

  /**
   * Setup toggles to enable switching between Macro and HTML code blocks
   * @returns {void}
  */
  setupCodeToggles() {
    const codeMacro = document.getElementById(`code-macro`);
    const codeHTML = document.getElementById(`code-html`);

    document.getElementById(`show-macro`).addEventListener(`click`, () => {
      codeMacro.classList.remove(`is-hidden`);
      codeHTML.classList.add(`is-hidden`);
    });

    document.getElementById(`show-html`).addEventListener(`click`, () => {
      codeHTML.classList.remove(`is-hidden`);
      codeMacro.classList.add(`is-hidden`);
    });
  },

};

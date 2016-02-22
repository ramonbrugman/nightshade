/**
 * @overview Pattern page module for styleguide patterns
 * @module PatternPage.js
 *
 * @todo Update setupCodeTogglers to iterate based on variants
*/

import pepjs from 'pepjs';
import { BasePage } from 'assets/js/pages/BasePage.js';
import hljs from 'assets/js/vendor/highlight.js';

export const PatternPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    this.setupCodeTogglers();
    hljs.initHighlighting();
  },

  /**
   * Setup toggles to enable switching between Macro and HTML code blocks
   * @returns {void}
  */
  setupCodeTogglers() {
    const macroTogglers = document.querySelectorAll(`.js-show-macro`);
    const HTMLTogglers = document.querySelectorAll(`.js-show-html`);

    [...macroTogglers].forEach((el) => {
      el.setAttribute(`touch-action`, `none`);
      el.addEventListener(`pointerup`, () => {
        const codeMacro = el.parentNode.querySelector(`.js-code-macro`);
        const codeHTML = el.parentNode.querySelector(`.js-code-html`);
        codeMacro.classList.remove(`is-hidden`);
        codeHTML.classList.add(`is-hidden`);
      });
    });

    [...HTMLTogglers].forEach((el) => {
      el.setAttribute(`touch-action`, `none`);
      el.addEventListener(`pointerup`, () => {
        const codeHTML = el.parentNode.querySelector(`.js-code-html`);
        const codeMacro = el.parentNode.querySelector(`.js-code-macro`);
        codeHTML.classList.remove(`is-hidden`);
        codeMacro.classList.add(`is-hidden`);
      });
    });
  },

};

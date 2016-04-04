/**
 * @overview Pattern page module for styleguide patterns
 * @module PatternPage.js
 *
 * @todo Update setupCodeTogglers to iterate based on variants
*/

import { NightshadeBase } from 'views/layout/NightshadeBase.js';
import { ScrollTo } from 'nightshade-core/src/animation/ScrollTo.js';
import hljs from 'assets/js/vendor/highlight.js';

export const PatternPage = {

  __proto__: NightshadeBase,

  init() {
    this.__proto__.init();
    this.setupSectionScrollTo();
    this.setupCodeTogglers();
    hljs.initHighlighting();
  },

  /**
   * Adds event listeners to Pattern nav links, enabling smooth scrolling to
   * corresponding sections
   * @returns {void}
  */
  setupSectionScrollTo() {
    const navItems = document.querySelectorAll(`.js-nav-item`);

    [...navItems].forEach((el) => {
      el.addEventListener(`click`, (e) => {
        const scrollElId = el.getAttribute(`href`).replace(`#`, ``);
        const scrollEl = document.getElementById(scrollElId);

        e.preventDefault();
        ScrollTo.scroll({scrollTarget: scrollEl});
      });
    });
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
        const codeMacro = el.parentNode.parentNode.parentNode.parentNode.querySelector(`.js-code-macro`);
        const codeHTML = el.parentNode.parentNode.parentNode.parentNode.querySelector(`.js-code-html`);
        codeMacro.classList.remove(`is-hidden`);
        codeHTML.classList.add(`is-hidden`);
        el.classList.add(`is-selected`);
        el.parentNode.querySelector(`.js-show-html`).classList.remove(`is-selected`);
      });
    });

    [...HTMLTogglers].forEach((el) => {
      el.setAttribute(`touch-action`, `none`);
      el.addEventListener(`pointerup`, () => {
        const codeHTML = el.parentNode.parentNode.parentNode.parentNode.querySelector(`.js-code-html`);
        const codeMacro = el.parentNode.parentNode.parentNode.parentNode.querySelector(`.js-code-macro`);
        codeHTML.classList.remove(`is-hidden`);
        codeMacro.classList.add(`is-hidden`);
        el.classList.add(`is-selected`);
        el.parentNode.querySelector(`.js-show-macro`).classList.remove(`is-selected`);
      });
    });
  },

};

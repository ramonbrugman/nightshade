/**
 * @overview Base module to be imported as the foundation for all pages
 * @module BasePage.js
 * @todo Move `touch` class injection into function if we keep Feature.js
 * @todo Modularize the init() method
*/

import feature from 'viljamis/feature.js';
import attachFastClick from 'fastclick';
import pepjs from 'pepjs';
import { ImgixSettings } from 'node_modules/@casper/nightshade-core/src/media/ImgixSettings';

export const BasePage = {


  init() {
    console.log(` base page activated `);

    this.navDrawer = document.getElementById(`nav-main`);

    ImgixSettings.init();

    /**
     * Checks for browser support of the `touch-action` CSS property and if so,
     * adds a class to the body to prevent the 300ms delay on touch devices.
     * If the property isn't supported, the FastClick polyfill is instantiated.
    */
    if (`touchAction` in document.body.style) {
      document.body.classList.add(`no-touch-delay`);
    } else {
      attachFastClick(document.body);
    }

    /**
     * Checks if the user is on a touch device and if so, adds the `touch` class
     * to the HTML element. If not, the `no-touch` class is added.
    */
    if (feature.touch) {
      document.documentElement.classList.add(`touch`);
    } else {
      document.documentElement.classList.add(`no-touch`);
    }

    document.getElementById(`menu-trigger`).addEventListener(`pointerup`, (e) => {
      e.stopPropagation();
      this.navDrawer.classList.toggle(`is-invisible`);
    });

    document.addEventListener(`pointerup`, (e) => {
      if (!e.target.classList.contains(`nav--main`, `menu-trigger`)) {
        this.navDrawer.classList.add(`is-invisible`);
      }
    });

    //  Configure nunjucks
    const env = nunjucks.configure([`app/views/`, `node_modules/@casper/`], { autoescape: true, watch: false });

  },
};

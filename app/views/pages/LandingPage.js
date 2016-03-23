/**
 * @overview Sets up the Credibility Landing page modules
 * @module LandingPage.js
*/

import { BasePage } from 'assets/js/pages/BasePage.js';
import { StarryBackground } from 'nightshade-core/src/backgrounds/StarryBackground.js';
import waypoints from 'waypoints/lib/noframework.waypoints.min.js';

export const LandingPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    StarryBackground.init();
    this.setWaypoints();
  },

  setWaypoints() {
    new Waypoint({
      element: document.querySelector(`.content-panel--engineering`),
      handler: () => {
        document.querySelector(`.landing-nav`).classList.toggle(`is-sticky`);
      },
      offset: 76,
    });
  },

};

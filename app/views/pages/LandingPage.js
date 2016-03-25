/**
 * @overview Sets up the Credibility Landing page modules
 * @module LandingPage.js
*/

import { BasePage } from 'assets/js/pages/BasePage.js';
import { StarryBackground } from 'nightshade-core/src/backgrounds/StarryBackground.js';
import { Gallery } from 'nightshade-core/src/gallery/Gallery.js';
import waypoints from 'waypoints/lib/noframework.waypoints.min.js';

export const LandingPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    StarryBackground.init();
    Gallery.init();
    this.setWaypoints();
  },

  /**
   * Sets up the page waypoints and sticky nav behavior, highlighting each nav
   * link when its corresponding waypoint is reached
   * @returns {void}
  */
  setWaypoints() {
    const nav = document.getElementById(`landing-nav`);
    const elAfterNav = nav.nextElementSibling;
    const navEngineering = document.getElementById(`nav-engineering`);
    const navCost = document.getElementById(`nav-cost`);
    const navReviews = document.getElementById(`nav-reviews`);
    const navConvenience = document.getElementById(`nav-convenience`);
    const navHeight = nav.offsetHeight;

    new Waypoint({
      element: document.getElementById(`engineering`),
      handler: (direction) => {
        nav.classList.toggle(`is-sticky`);
        navEngineering.classList.toggle(`is-selected`);

        if (direction === `down`) {
          elAfterNav.style.marginTop = `${navHeight}px`;
        } else {
          elAfterNav.removeAttribute(`style`);
        }
      },
      offset: navHeight,
    });

    new Waypoint({
      element: document.getElementById(`cost`),
      handler: (direction) => {
        navCost.classList.toggle(`is-selected`);
        navEngineering.classList.toggle(`is-selected`);
      },
      offset: navHeight,
    });

    new Waypoint({
      element: document.getElementById(`reviews`),
      handler: (direction) => {
        navReviews.classList.toggle(`is-selected`);
        navCost.classList.toggle(`is-selected`);
      },
      offset: navHeight,
    });

    new Waypoint({
      element: document.getElementById(`convenience`),
      handler: (direction) => {
        navConvenience.classList.toggle(`is-selected`);
        navReviews.classList.toggle(`is-selected`);
      },
      offset: navHeight,
    });
  },

};

/**
 * @overview Sets up the Credibility Landing page modules
 * @module LandingPage.js
*/

import { BasePage } from 'assets/js/pages/BasePage.js';
import { StarryBackground } from 'nightshade-core/src/backgrounds/StarryBackground.js';
import { Gallery } from 'nightshade-core/src/gallery/Gallery.js';
import { ScrollTo } from 'nightshade-core/src/animation/ScrollTo.js';
import waypoints from 'waypoints/lib/noframework.waypoints.min.js';
import imgix from 'imgix.js';

export const LandingPage = {

  __proto__: BasePage,

  init() {
    this.__proto__.init();
    StarryBackground.init();
    Gallery.init();
    this.setWaypoints();
    this.setupResponsiveImages();
  },

  /**
   * Sets up the page waypoints and sticky nav behavior, highlighting each nav
   * link when its corresponding waypoint is reached.
   * Binds smooth scrolling animation to each waypoint.
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
    const scrollOffset = navHeight - 1;

    const waypointEngineering = new Waypoint({
      element: document.getElementById(`engineering`),
      handler: (direction) => {
        nav.classList.toggle(`is-sticky`);
        navEngineering.classList.toggle(`is-selected`);

        if (direction === `down` && window.matchMedia(`(min-width: 769px)`).matches) {
          elAfterNav.style.marginTop = `${navHeight}px`;
        } else {
          elAfterNav.removeAttribute(`style`);
        }
      },
      offset: navHeight,
    });

    const waypointCost = new Waypoint({
      element: document.getElementById(`cost`),
      handler: (direction) => {
        navCost.classList.toggle(`is-selected`);
        navEngineering.classList.toggle(`is-selected`);
      },
      offset: navHeight,
    });

    const waypointReviews = new Waypoint({
      element: document.getElementById(`reviews`),
      handler: (direction) => {
        navReviews.classList.toggle(`is-selected`);
        navCost.classList.toggle(`is-selected`);
      },
      offset: navHeight,
    });

    const waypointConvenience = new Waypoint({
      element: document.getElementById(`convenience`),
      handler: (direction) => {
        navConvenience.classList.toggle(`is-selected`);
        navReviews.classList.toggle(`is-selected`);
      },
      offset: navHeight,
    });

    // Bind smooth scrolling animation when beacon and nav links are clicked
    document.getElementById(`beacon-engineering`).addEventListener(`click`, (e) => {
      let offset = 0;
      e.preventDefault();

      if (window.matchMedia(`(min-width: 769px)`).matches) {
        offset = scrollOffset;
      }
      ScrollTo.scroll({scrollTarget: waypointEngineering.element, offset: offset});
    });

    navEngineering.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointEngineering.element, offset: scrollOffset});
    });

    navCost.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointCost.element, offset: scrollOffset});
    });

    navReviews.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointReviews.element, offset: scrollOffset});
    });

    navConvenience.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointConvenience.element, offset: scrollOffset});
    });
  },

  /**
   * Enable custom image crops at specified breakpoints, using imgix.js
   * @returns {void}
  */
  setupResponsiveImages() {
    imgix.onready(function() {
      imgix.fluid({
        fluidClass: `imgix-fluid--cost`,
        updateOnResize: true,
        updateOnResizeDown: true,
        updateOnPinchZoom: true,
        pixelStep: 10,
        autoInsertCSSBestPractices: true,
        onChangeParamOverride: () => {
          let fluidParams = {
            rect: `unset`,
            auto: `format`,
          };

          if (window.matchMedia(`(max-width: 600px)`).matches) {
            fluidParams = {
              rect: `900,650,3800,3800`,
              auto: `format`,
            };
          }

          return fluidParams;
        },
      });
    });
  },

};

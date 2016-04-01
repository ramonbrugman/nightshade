/**
 * @overview Sets up the Credibility Landing page modules
 * @module LandingPage.js
 * @todo Refactor waypoints and nav link binding to be less page-specific
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
    this.nav = document.getElementById(`landing-nav`);
    this.navHeight = null;
    this.scrollOffset = null;

    this.__proto__.init();
    StarryBackground.init();
    Gallery.init();
    this.setNavAndOffsetHeight();
    this.setWaypoints();
    this.handleResize();
    this.setupResponsiveImages();
  },

  /**
   * Sets the nav height and scroll offset on load, and when window is resized
   * @returns {void}
  */
  setNavAndOffsetHeight() {
    this.navHeight = this.nav.offsetHeight;
    this.scrollOffset = this.navHeight > 0 ? (this.navHeight - 1) : 0;
  },

  /**
   * Sets up the page waypoints and sticky nav behavior, highlighting each nav
   * link when its corresponding waypoint is reached.
   * Binds smooth scrolling animation to each waypoint.
   * @returns {void}
  */
  setWaypoints() {
    const elAfterNav = this.nav.nextElementSibling;
    const navEngineering = document.getElementById(`nav-engineering`);
    const navCost = document.getElementById(`nav-cost`);
    const navReviews = document.getElementById(`nav-reviews`);
    const navConvenience = document.getElementById(`nav-convenience`);

    const waypointEngineering = new Waypoint({
      element: document.getElementById(`engineering`),
      handler: (direction) => {
        this.nav.classList.toggle(`is-sticky`);
        navEngineering.classList.toggle(`is-selected`);

        if (direction === `down` && window.matchMedia(`(min-width: 769px)`).matches) {
          elAfterNav.style.marginTop = `${this.navHeight}px`;
        } else {
          elAfterNav.removeAttribute(`style`);
        }
      },
      offset: this.navHeight,
    });

    const waypointCost = new Waypoint({
      element: document.getElementById(`cost`),
      handler: (direction) => {
        navCost.classList.toggle(`is-selected`);
        navEngineering.classList.toggle(`is-selected`);
      },
      offset: this.navHeight,
    });

    const waypointReviews = new Waypoint({
      element: document.getElementById(`reviews`),
      handler: (direction) => {
        navReviews.classList.toggle(`is-selected`);
        navCost.classList.toggle(`is-selected`);
      },
      offset: this.navHeight,
    });

    const waypointConvenience = new Waypoint({
      element: document.getElementById(`convenience`),
      handler: (direction) => {
        navConvenience.classList.toggle(`is-selected`);
        navReviews.classList.toggle(`is-selected`);
      },
      offset: this.navHeight,
    });

    // Bind smooth scrolling animation when beacon and nav links are clicked
    document.getElementById(`beacon-engineering`).addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointEngineering.element, offset: this.scrollOffset});
    });

    navEngineering.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointEngineering.element, offset: this.scrollOffset});
    });

    navCost.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointCost.element, offset: this.scrollOffset});
    });

    navReviews.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointReviews.element, offset: this.scrollOffset});
    });

    navConvenience.addEventListener(`click`, (e) => {
      e.preventDefault();
      ScrollTo.scroll({scrollTarget: waypointConvenience.element, offset: this.scrollOffset});
    });
  },

  /**
   * Refreshes waypoints and sets nav and offset height when window is resized
   * @returns {void}
  */
  handleResize() {
    let resizeTimer;

    window.addEventListener(`resize`, () => {
      // mimics debouncing event, with a 250ms delay
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        this.setNavAndOffsetHeight();
        Waypoint.refreshAll();
      }, 250);
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

          if (window.matchMedia(`(max-width: 26.2em)`).matches) {
            fluidParams = {
              rect: `500,500,4000,4000`,
              auto: `format`,
            };
          }

          return fluidParams;
        },
      });
    });
  },

};

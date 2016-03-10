/**
 * @overview Nav Drawer module for styleguide navigation
 * @module NavDrawer.js
 * @todo We may need a polyfill for .closest() method
*/

export const NavDrawer = {

  init() {
    this.navToggle = document.getElementById(`menu-trigger`);
    this.navDrawer = document.getElementById(`nav-main`);
    this.setupNav();
  },

  /**
   * Setup Nav Drawer show/hide event listeners
   * @returns {void}
  */
  setupNav() {
    this.navToggle.setAttribute(`touch-action`, `none`);
    this.navToggle.addEventListener(`pointerup`, (e) => {
      e.stopPropagation();
      if (this.navDrawer.classList.contains(`is-invisible`)) {
        this.showNav();
      } else {
        this.hideNav();
      }
    });

    document.addEventListener(`click`, (e) => {
      if (!this.navDrawer.classList.contains(`is-invisible`) && !e.target.closest(`.nav--main`) && !e.target.closest(`.menu-trigger`)) {
        this.hideNav();
      }
    });
  },

  /**
   * Shows Nav Drawer, sliding it out over the page
   * @returns {void}
  */
  showNav() {
    this.navDrawer.setAttribute(`aria-expanded`, true);
    this.navDrawer.classList.remove(`is-invisible`);
  },

  /**
   * Hides Nav Drawer, retracting it back off the canvas
   * @returns {void}
  */
  hideNav() {
    const onHideNavEnd = () => {
      this.navDrawer.setAttribute(`aria-expanded`, false);
      this.navDrawer.classList.add(`is-invisible`);
      this.navDrawer.classList.remove(`is-retracted`);
      this.navDrawer.removeEventListener(`transitionend`, onHideNavEnd);
    };

    this.navDrawer.classList.add(`is-retracted`);
    this.navDrawer.addEventListener(`transitionend`, onHideNavEnd);

    // Fallback for IE9
    if (!feature.cssTransition) {
      onHideNavEnd();
    }
  },

};

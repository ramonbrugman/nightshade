/**
 * @module AnalyticsModule.js
 * This module runs code to check for landings from email campaigns and to
 * initialize scroll and window-size tracking.
 *
 * If you add functionality, please note it here!
 */

import Cookies from 'js-cookie'; 

export const AnalyticsModule = {

  init() {
    this.Cookie = Cookies;
    this.trackMarketingCloudLanding();
    this.initDebouncedTracking();
  },

  /**
   * Looks for url parameters that indicate a Casper marketing email,
   * and, if they're present, stores them in a cookie.
   */
  trackMarketingCloudLanding() {
    const landingParams = this.getUrlParams();

    // These six property names need to be in the Object to be part of the Marketing Cloud
    // We then save a jquery cookie that expires in a year, per marketing
    if (landingParams.hasOwnProperty(`j`) && landingParams.hasOwnProperty(`e`) &&
        landingParams.hasOwnProperty(`l`) && landingParams.hasOwnProperty(`u`) &&
        landingParams.hasOwnProperty(`mid`) && landingParams.hasOwnProperty(`jb`)) {
      const marketingCloudObject = {};
      marketingCloudObject[`j`] = landingParams[`j`];
      marketingCloudObject[`e`] = landingParams[`e`];
      marketingCloudObject[`l`] = landingParams[`l`];
      marketingCloudObject[`u`] = landingParams[`u`];
      marketingCloudObject[`mid`] = landingParams[`mid`];
      marketingCloudObject[`jb`] = landingParams[`jb`];
      this.Cookie.set(`marketingCloudObject`, JSON.stringify(marketingCloudObject), { expires: 30 });
    }
  },

  /**
   * Wrapper method that triggers initial window size and scroll depth calls as
   * well as initializing debounced tracking of both events.
   */
  initDebouncedTracking() {
    // Scrolling
    this.scrollTrack(true);
    this.delayedEventHandler(`scroll`, this.scrollTrack, 1000);

    // Note that testing UA with regex is NOT one of our best practices. Making an exception in this case
    // because it won't affect UI, just how we track users with devices that *probably* don't have resizable
    // browser windows
    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent);

    // Resizing
    this.resizeTrack(true);
    if (!isMobile) {
      this.delayedEventHandler(`resize`, this.resizeTrack, 250);
    }
  },

  /**
   * Sends tracking scroll event to segment via analytics.js object.
   * @param {bool} initialFlag - true => "Initial Call", false => "Subsequent Call"
   */
  scrollTrack(initialFlag) {
    const scrollTop = window.pageYOffset;
    const pageHeight = document.documentElement.offsetHeight;
    const windowHeight = document.documentElement.clientHeight;

    // Mysterious NaNs coming through for some IE users with this call,
    // so I'm adding this check per data's request.
    if (!(isNaN(scrollTop) || isNaN(pageHeight) || isNaN(windowHeight))) {
      analytics.track((initialFlag ? `Intialize Scroll` : `Scroll`), {
        pixelDepth: scrollTop,
        topOfViewPercent: scrollTop / pageHeight * 100,
        bottomOfViewPercent: (scrollTop + windowHeight) / pageHeight * 100,
        visbilePercentOfPage: windowHeight / pageHeight * 100,
        nonInteraction: true,
      });
    }
  },

  /**
   * Sends resize tracking event to segment via analytics.js object.
   * @param {bool} initialFlag - true => "Initial Call", false => "Subsequent Call"
   */
  resizeTrack(initialFlag) {
    analytics.track((initialFlag ? `Initial Window Size` : `Resize`), {
      windowHeight: document.documentElement.clientHeight,
      windowWidth: document.documentElement.clientWidth,
      screenDimensions: `${screen.width} x ${screen.height}`,
      pixelDensity: window.devicePixelRatio,
      nonInteraction: true,
    });
  },

  /**
   * Helper method to effectively debounce callback.
   * @param {event} event - Event to listen for and debounce
   * @param {function} cb - Callback to call on event.  
   * @param {int} delay - Number of ms to wait without even before calling cb.
   */
  delayedEventHandler(event, cb, delay){
    let delayTimer;

    window.addEventListener(event, function() {
      // Mimics debouncing event, only occuring the length of the delay after the most recent event.
      clearTimeout(delayTimer);

      delayTimer = setTimeout(() => {
        cb(false);
      }, delay);
    });
  },

  /**
   * Helper method to get url params.
   * @return {object} Object mapping url param keys to values. 
   * @todo move to utils module?
   */
  getUrlParams() {
    const query = window.location.search.substring(1);
    const rawVars = query.split(`&`);
    const params = {};
    for (const v of rawVars) {
      const [key, val] = v.split(`=`);
      params[key] = decodeURIComponent(val);
    }
    return params;
  }

};
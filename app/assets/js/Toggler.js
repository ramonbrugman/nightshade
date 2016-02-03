/**
 * @fileoverview A generic toggler class to handle toggling events
 * @authors Casper Coders
 */

// import Rx from "rx";
// import rxdom from "rx-dom";
import { attemptQuery, attemptMandatoryQuery } from 'assets/js/CasperUtilityModules.js';

export const Toggler = {
  toggle({contextSelector, elementsToObserveSelector, elementsToExpandSelector, elementsToToggleSelector, options} = { contextSelector: undefined, elementsToObserveSelector: undefined, elementsToExpandSelector: undefined, elementsToToggleSelector: undefined, options: {showHideClass: `is-invisible`, expandedClass: `is-expanded`, minWidthThreshold: null}}) {
    options = options || {};

    const { showHideClass, expandedClass, minWidthThreshold } = options;
    // TEMP until this gets merged w/ CourierSlotPicker
    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

    // Must account for minWidthThreshold being the only things passed into the
    // options object
    this.showHideClass = Object.is(showHideClass, undefined) === true ? `is-invisible` : showHideClass;
    this.expandedClass = Object.is(expandedClass, undefined) === true ? `is-expanded` : expandedClass;

    // Context element is based on the contextSelectorPassed in or document
    this.contextSelector = contextSelector;

    try {
      this.contextEl = attemptMandatoryQuery(this.contextSelector);
    } catch (e) {
      // If null or invalid value is passed to not allow a valid query to be possible, it's intuitive to have the whole document body queries for the elements to observe, toggle, & expand.
      this.contextSelector = `body`;
      this.contextEl = document.body;
    }

    this.elementsToObserveSelector = elementsToObserveSelector;
    this.elementsToExpandSelector = elementsToExpandSelector;
    this.elementsToToggleSelector = elementsToToggleSelector;

    this.bindSelectors();
    this.setUpObservedElements();

    this.minWidthThreshold = minWidthThreshold;
    this.setUpExternalFactorsEventListeners();
  },

  bindSelectors() {
    try {
      this.elementsToToggle = attemptMandatoryQuery(this.elementsToToggleSelector, this.contextEl, `querySelectorAll`);
    } catch(e) {
      throw new Error(`No element node instances were found to be toggleable. You must have at least one element to be toggable for this module to be used`);
    }

    // TODO: Accept an array or DOM String
    this.elementsToExpand = attemptQuery(this.elementsToExpandSelector, this.contextEl, `querySelectorAll`) || [];
    this.elementsToObserve = attemptQuery(this.elementsToObserveSelector, this.contextEl, `querySelectorAll`) || [];
  },

  setUpObservedElements(){
    [...this.elementsToObserve].forEach((el) => {
      // TODO: In a follow-up PR, set touch-action=none to el & use pointer-up
      el.setAttribute(`touch-action`, `none`);

      el.addEventListener(`pointerup`, ()=> {
        this.setUpTogglingAndExpanding();
      });
    });
  },

  expandAllElementsToExpand(){
    [...this.elementsToExpand].forEach((el)=> {
      el.setAttribute(`aria-expanded`, true);

      if (el.hasAttribute(`aria-hidden`)) {
        el.setAttribute(`aria-hidden`, false);
      }

      if (this.expandedClass) {
        el.classList.add(this.expandedClass);
      }
    });
  },

  unexpandAllElementsToExpand() {
    [...this.elementsToExpand].forEach((el)=> {
      el.setAttribute(`aria-expanded`, false);

      if (el.hasAttribute(`aria-hidden`)) {
        el.setAttribute(`aria-hidden`, true);
      }

      if (this.expandedClass && el.classList.contains(this.expandedClass)){
        el.classList.remove(this.expandedClass);
      }
    });
  },

  showAllElementsToToggle(){
    [...this.elementsToExpand].forEach((el)=> {
      if (this.showHideClass && el.classList.contains(this.showHideClass)) {
        el.classList.remove(this.showHideClass);
      }
    });
  },

  hideAllElementsToToggle(){
    [...this.elementsToExpand].forEach((el)=> {
      if (this.showHideClass && !el.classList.contains(this.showHideClass)) {
        el.classList.add(this.showHideClass);
      }
    });
  },

  setUpTogglingAndExpanding(){
    const coreLogic = ()=> {
      const firstElementToToggle = this.elementsToToggle[0];

      if (firstElementToToggle.classList.contains(this.showHideClass)) {
        this.showAllElementsToToggle();
        this.expandAllElementsToExpand();
      } else {
        this.hideAllElementsToToggle();
        this.unexpandAllElementsToExpand();
      }
    };

    if (!Object.is(this.minWidthThreshold, null) && !Object.is(this.minWidthThreshold, undefined)){
      const cssMQ = `(min-width: ${this.minWidthThreshold})`;

      if (window.matchMedia(cssMQ).matches) {
        return false;
      } else {
        coreLogic();
      }
    }
    else {
      coreLogic();
    }
  },

  // TODO: Should be a func in a utility module. Always useful.
  attemptQuery(selector, context = document, queryType = `querySelector`){
    // TODO: Accept an array or DOM String
    try {
      return context[queryType](selector);
    } catch(e) {
      throw new Error(`Attempt to query the DOM was unsuccessful using \`${selector}\` selector in the context of  \`${context}\` with the \`${queryType}\` method invoked. The exact error message of this attempt was the following: ${e.message}`);
    }
  },

  attemptMandatoryQuery(selector, context = document, queryType = `querySelector`){
    let result;

    try {
      result = attemptQuery(selector, context, queryType);
    } catch(e) {
      throw new Error(`Could not invoke attemptQuery() without failure: ${e.message}`);
    }

    // Should be at least an eleement of a value
    if (Object.is(result, null) || Object.is(result, undefined) || Object.is(result, [])) {
      throw new Error(`Selector passed in did not reference an element on the page at the point this script was ran or queryable to be able to continiue execution of the rest of this code. Evaluate the selector and the context this function was ran in order for the intended effect of this script be realized.`);
    }

    return result;
  },

  setUpExternalFactorsEventListeners(){
    this.setUpResizingAndLoadListeners();
    this.rebindOnMutation();
  },

  setUpResizingAndLoadListeners(){
    // Set up optimized Resize
    // TODO: Make this a ES6 module that's later required
    (function() {
      const throttle = function(type, name, obj) {
        if (Object.is(obj, null) || Object.is(obj, undefined)) {
          obj = window;
        }

        let running = false;
        const func = function() {
          if (running) {
            return;
          }

          running = true;
          requestAnimationFrame(function() {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
          });
        };

        obj.addEventListener(type, func);
      };

      throttle(`resize`, `optimizedResize`);
    })();


    if (!Object.is(this.minWidthThreshold, null) && !Object.is(this.minWidthThreshold, undefined)){
      const cssMQ = `(min-width: ${this.minWidthThreshold})`;
      const resetExpandingAndToggling = ()=> {
        if (window.matchMedia(cssMQ).matches) {
          this.expandAllElementsToExpand();
          this.showAllElementsToToggle();
        } else {
          this.unexpandAllElementsToExpand();
          this.hideAllElementsToToggle();
        }
      };

      window.addEventListener(`optimizedResize`, resetExpandingAndToggling);
      window.addEventListener(`load`, resetExpandingAndToggling);
    }
  },

  rebindOnMutation(){
    const mutationObserver = Rx.DOM.fromMutationObserver(this.contextEl, {
      attributes: false,
      childList: true,
      characterData: true,
    });

    mutationObserver.subscribe((mutations)=> {
      mutations.forEach((mutation) => {
        if (`childList` === mutation.type || `characterData` === mutation.type) {
          this.bindSelectors();
        }
      });
    });
  },
};

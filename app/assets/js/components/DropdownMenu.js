/**
 * @overview An object that references a DOM element with a specific HTML
 * structure w/ navigation unctionality that collapses & uncomplasses down as needed
 * @copyright Casper 2015
 */

// import Rx from "rx";

// let menu = document.querySelector( '.menu' );
// let menuItems = menu.queryAll( '> ul > li');
//
export const DropdownMenu = {

  /** Initializes menu with the approrpiate information to do so
   * @param {String} menuSelector DOMString representing what the base DOM
   * element to add dropdown navigation behavior to
   * @param {Object} options object of modifiers to tweak the behavior of the
   * object towards adding dropdown navigation to the element when found via
   * @returns this Returns a reference to this object.
   * menuSelector
  */
  // TODO: Providate a reasonable default to use so most parameters aren't
  // necessary to override for everyday usage.
  initializeMenu( namedParameters = {} ){

    // TODO: Revisit names of options parameter.
    const { menuSelector, elementSelectorsToToggleSubmenus, elementSelectorsToToggleMenu, otherElementSelectorsToCloseUncollapsedSubmenus, collapsedClass, uncollapsedClass, retractedClass, menuToggleClass, elementSelectorsToToggleWithMenu, mediaqueryToAutocollapseSubmenus, autoOpenNavItemOptions } = namedParameters;

    try {

      this.menuEl = this.attemptMandatoryQuery( menuSelector );

    } catch( e ) {

      new Error( `Initialization of this navigation module could not be complated without a reference to a DOM element to add behavior to. The following error was returned when attempting to do so: ${e.message}.` );

    }

    this.collapsedClass = collapsedClass || `is-collapsed`;
    this.uncollapsedClass = uncollapsedClass || `is-uncollapsed`;
    this.retractedClass = retractedClass || `is-retracted`;
    this.menuToggleClass = menuToggleClass || `is-open`;
    this.scrollHeaderClass = `is-locked`;
    this.mediaqueryToAutocollapseSubmenus = mediaqueryToAutocollapseSubmenus || `(max-width: 768px)`;
    this.elementSelectorsToToggleSubmenus = elementSelectorsToToggleSubmenus || `> ul > li.has-submenu`;
    this.autoOpenNavItemOptions = autoOpenNavItemOptions || { itemSelector: `#shop-button`, mediaQuery: `(max-width: 67.875em)` };

    this.headerSelector = `#header`;
    this.otherElementSelectorsToCloseUncollapsedSubmenus = !Object.is( otherElementSelectorsToCloseUncollapsedSubmenus, undefined ) && Array.isArray( otherElementSelectorsToCloseUncollapsedSubmenus ) ? otherElementSelectorsToCloseUncollapsedSubmenus : [];
    this.elementSelectorsToToggleMenu = !Object.is( elementSelectorsToToggleMenu, undefined ) && Array.isArray( elementSelectorsToToggleMenu ) ? elementSelectorsToToggleMenu : [];
    this.elementSelectorsToToggleWithMenu = !Object.is( elementSelectorsToToggleWithMenu, undefined ) && Array.isArray( elementSelectorsToToggleWithMenu ) ? elementSelectorsToToggleWithMenu : [];

    // TODO: Utilize WeakMaps or Symbol for provide methods after testing IE9
    // a great deal; decide to have a dependency injection appraoch to this module
    // & other modules accordingly
    this._setupMenuItems();
    this._setupEdgeCasesToCloseUncollapsedSubmenus();
    this._setupEdgeCasesToHideMenu();

    this._clickToCloseNav();

    return this;

  },

  /**
   * Sets up menu items to be properly set up for user interaction & the module
   * appropriately reacting to such an event
   * @returns {void}
   * @private
   */

  _setupMenuItems() {

    // TODO: This should probably be a selector passed in to find first-level menu
    // items more absolutely & be passed into this func
    this.menuItems = this.attemptQuery( this.elementSelectorsToToggleSubmenus, this.menuEl, `queryAll` );
    this.menuItems.forEach( ( menuItem ) => {

      menuItem.classList.add( this.collapsedClass );
      menuItem.setAttribute( `aria-expanded`, `false` );

      Rx.DOM.fromEvent( menuItem, `click` ).filter( e => e.target.parentElement.isEqualNode( menuItem ) && e.target.classList.contains( `nav-item` ) ).subscribe( e => {

        this._reactToClickedLink( e.target );
        e.preventDefault();

      } );

    } );

  },

  /**
   * If applicable, close the currently opened panel
   * @returns {void}
   * @private
   */

  _closeCurrentlyUncollapsedSubmenuIfApplicable() {

    const openedPanel = this.menuEl.query( `> ul > li.${this.uncollapsedClass}` );

    if ( !Object.is( openedPanel, undefined ) && !Object.is( openedPanel, null ) ) {

      const onRetractEnd = () => {

        // TODO: Create intermediate function(s) that handles this in an either-or way with a
        // second parameter like you did with custom Tabs in CourierSLotPicker
        openedPanel.classList.remove( this.uncollapsedClass, this.retractedClass );
        openedPanel.classList.add( this.collapsedClass );
        openedPanel.setAttribute( `aria-expanded`, `false` );
        const collapsedEvent = this._generateSubmenuCollapsedEvent();

        this.menuEl.dispatchEvent( collapsedEvent );

      };

      if ( window.matchMedia( this.mediaqueryToAutocollapseSubmenus ).matches ) {

        onRetractEnd();

      } else {

        openedPanel.classList.add( this.retractedClass );
        $( openedPanel ).one( `transitionend`, onRetractEnd );

        // Fallback for IE9
        if ( !Modernizr.csstransitions ) {

          onRetractEnd();

        }

      }

    }

  },

  /*
   * Close any submenu open
   * @returns {void}
   * @private
   */

  _reactToClickedLink( link ){


    // TODO: Add analytics module here
    if( link.parentElement.classList.contains( this.uncollapsedClass ) ) {

      this._closeCurrentlyUncollapsedSubmenuIfApplicable();

      // TODO: Readd analytics when the new one is prepared here

    } else {

      this._closeCurrentlyUncollapsedSubmenuIfApplicable();

      // TODO: Put in a _openCurrentlyCollapsedSubmenu
      link.parentElement.classList.remove( this.collapsedClass );
      link.parentElement.classList.add( this.uncollapsedClass );
      link.parentElement.setAttribute( `aria-expanded`, `true` );
      const uncollapsedEvent = this._generateSubmenuUncollapsedEvent();

      this.menuEl.dispatchEvent( uncollapsedEvent );

    }

  },

  _setupEdgeCasesToCloseUncollapsedSubmenus() {

    this.otherElementSelectorsToCloseUncollapsedSubmenus.forEach( ( selector ) => {

      try {

        const node = this.attemptQuery( selector );

        Rx.DOM.fromEvent( node, `click` ).subscribe( ()=> {

          this._closeCurrentlyUncollapsedSubmenuIfApplicable();

        } );

      } catch( e ) {

        throw new Error( `Unable to account for a particular element to set up a particular edge case as desired; the exact error message was ${e}` );

      }

    } );

  },

  _setupEdgeCasesToHideMenu() {

    this.elementSelectorsToToggleMenu.forEach( ( selector ) => {

      try {

        const elementToToggleMenu = this.attemptQuery( selector );
        const navMenu = this.attemptQuery( this.headerSelector );

        const desiredBehaviorToToggleMenu = function() {

          // TODO: Get back with FE lead that it's safe to assume the items in this
          // array should  automatically close submenus
          this._closeCurrentlyUncollapsedSubmenuIfApplicable();
          this.menuEl.classList.toggle( this.menuToggleClass );

          navMenu.classList.toggle( this.scrollHeaderClass );

          //scrolls to top for mobile menu
          window.scrollTo(0,0);

          if ( this.menuEl.classList.contains( this.menuToggleClass ) && !Object.is( this.autoOpenNavItemOptions, null ) && !Object.is( this.autoOpenNavItemOptions, undefined ) && window.matchMedia( this.autoOpenNavItemOptions.mediaQuery ).matches ) {

            try {

              const navItemEl = this.attemptMandatoryQuery( this.autoOpenNavItemOptions.itemSelector, this.menuEl, `query` );
              navItemEl.click();

            } catch ( e ) {

              new Error( `Could not arrange for a particular nav item to be clicked with the provided element query in this.autoOpenNavItemOptions. The exact error was ${e.message}` );

            }

          }

          this.elementSelectorsToToggleWithMenu.forEach( elementToToggleWithMenuSelector => {

            try {

              const elementToToggleWithMenu = this.attemptQuery( elementToToggleWithMenuSelector );
              elementToToggleWithMenu.classList.toggle( this.menuToggleClass );

            } catch( e ) {

              throw new Error( `Unable to account for a particular element to set up a particular edge case associated with hiding the menu as desired; the exact error message was ${e}` );

            }

          } );

        };

        const desiredBehaviorToRemoveActiveMenuElements = function() {

          // TODO: Get back with FE lead that it's safe to assume the items in this
          // array should  automatically close submenus
          this._closeCurrentlyUncollapsedSubmenuIfApplicable();
          // this.menuEl.classList.remove( this.menuToggleClass );

          // this.elementSelectorsToToggleWithMenu.forEach( elementToToggleWithMenuSelector => {
          //
          //   try {
          //
          //     const elementToToggleWithMenu = this.attemptQuery( elementToToggleWithMenuSelector );
          //     elementToToggleWithMenu.classList.remove( this.menuToggleClass );
          //
          //   } catch( e ) {
          //
          //     throw new Error( `Unable to account for a particular element to set up a particular edge case associated with hiding the active elements associated with menu as desired; the exact error message was ${e}` );
          //
          //   }
          //
          // } );

        };

        Rx.DOM.fromEvent( elementToToggleMenu, `click` ).subscribe( desiredBehaviorToToggleMenu.bind( this ) );
        Rx.DOM.fromEvent( window, `orientationchange` ).filter( () => window.matchMedia( this.mediaqueryToAutocollapseSubmenus ).matches ).throttle( 300 ).subscribe( desiredBehaviorToRemoveActiveMenuElements.bind( this ) );

      } catch( e ) {

        throw new Error( `Unable to account for a particular element to set up a particular edge case associated with hiding the menu as desired; the exact error message was ${e}` );

      }

    } );

  },

  _clickToCloseNav() {

    const mainElement = document.querySelector( `main` );

    mainElement.addEventListener( `click`, (event) => {
      let submenuList = this.attemptQuery( this.elementSelectorsToToggleSubmenus, this.menuEl, `queryAll` );

      submenuList.forEach( (submenu) => {
        if ( submenu.classList.contains( this.uncollapsedClass ) ) {
          this._closeCurrentlyUncollapsedSubmenuIfApplicable();
        };
      });
    });
  },

  /**
   * Event generated to inform a CustomEvent instance that relates to the
   * submenu being collapsed has happened.
   * @return {void}
   * @private
   */
  _generateSubmenuCollapsedEvent() {

    return new CustomEvent( `submenu-collapsed`, { detail: {}, bubbles: true, cancelable: false } );

  },

  /**
   * Event generated to inform a CustomEvent instance that relates to the
   * submenu being uncollapsed has happened.
   * @return {void}
   * @private
   */
  _generateSubmenuUncollapsedEvent(){

    return new CustomEvent( `submenu-uncollapsed`, { detail: {}, bubbles: true, cancelable: false } );

  },

  // TODO: Must be put in a utils module when the time presents itself; ideally before November 1st

  /**
   * Attempts to query a provided selector within a specific context & method.
   * Throws an exception when the query throws because of serious problems with
   * the desired query.
   * @param {string} selector The DOMString representing what is to be queried
   * @param {HTMLElement=} context The context for the DOM query to be done within. `document` by default.
   * @param {string=} queryType The type of query to done, dictating the return
   * type of the query. `querySelector` by default
   * @returns {HTMLElement|Array<HTMLElement>|Null} result of DOM query
  */
  attemptQuery( selector, context = document, queryType = `querySelector` ){

    // TODO: Accept an array or DOM String
    try {

      return context[ queryType ]( selector );

    } catch( e ) {

      throw new Error( `Attempt to query the DOM was unsuccessful using \`${selector}\` selector in the context of  \`${context}\` with the \`${queryType}\` method invoked. The exact error message of this attempt was the following: ${e.message}` );

    }

  },

  /**
   * Attempts to query a provided selector within a specific context & method
   * that should return a result.
   * Throws an exception when the query throws because of serious problems with
   * the desired query or because no result could be found
   * @param {string} selector The DOMString representing what is to be queried
   * @param {HTMLElement=} context The context for the DOM query to be done within. `document` by default.
   * @param {string=} queryType The type of query to done, dictating the return
   * type of the query. `querySelector` by default
   * @returns {HTMLElement|Array<HTMLElement>} result of DOM query
  */
  attemptMandatoryQuery( selector, context = document, queryType = `querySelector` ){

    let result;

    try {

      result = this.attemptQuery( selector, context, queryType );

    } catch( e ) {

      throw new Error( `Could not invoke this.attemptQuery() without failure: ${e.message}` );

    }

    // Should be at least an eleement of a value
    if ( Object.is( result, null ) || Object.is( result, undefined ) || Object.is( result, []) ) {

      throw new Error( `Selector passed in did not reference an element on the page at the point this script was ran or queryable to be able to continiue execution of the rest of this code. Evaluate the selector and the context this function was ran in order for the intended effect of this script be realized.` );

    }

    return result;

  },

};

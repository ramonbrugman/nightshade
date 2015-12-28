import Rx from "rx";
import "rx-dom";
import { DropdownMenu } from 'js/components/DropdownMenu';

export const BasePage = {

init() {
  console.log(` base page activated `);

  nunjucks.configure(`app/templates/`, { autoescape: true, watch: false });


  DropdownMenu.initializeMenu( {
      menuSelector: '.nav-main',
      elementSelectorsToToggleMenu: [ '.js-menu-trigger' ],
      elementSelectorsToToggleWithMenu: [ '.nav-mobile-overlay' ]
  } );
},

};

/**
 * @overview Renders icons
 * @module IconsPage.js
*/

import { PatternPage } from 'views/layout/PatternPage.js';
import { icons_list } from 'views/icons/icons_list.js';

export const IconsPage = {

  __proto__: PatternPage,

init() {
  console.log(`icons init started`);

  this.__proto__.init();
  this.setupContent();

  console.log(`icons init completed`);
},

setupContent() {
  const tpl = nunjucks.render('views/icons/_icons_list.html', { data: icons_list });
  const page = document.getElementById('icons-content');

  page.innerHTML = tpl;
},

};

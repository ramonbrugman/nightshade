import { BasePage } from 'assets/js/pages/BasePage';
import { icons_list } from 'modules/icons/icons_list.js';


export const IconsPage = {

  __proto__: BasePage,

init() {
  console.log(`icons init started`);

  this.__proto__.init();
  this.setupContent();

  console.log(`icons init completed`);
},


setupContent() {
  const tpl = nunjucks.render('icons/icons_list.html', { data: icons_list });
  const page = document.getElementById('icons-content');

  page.innerHTML = tpl;
},

};

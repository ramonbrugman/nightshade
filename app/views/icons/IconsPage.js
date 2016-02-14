import { BasePage } from 'assets/js/pages/BasePage';
import { icons_list } from 'views/icons/icons_list.js';


export const IconsPage = {

  __proto__: BasePage,

init() {
  console.log(`icons init started`);

  this.__proto__.init();
  this.setupContent();

  console.log(`icons init completed`);
},


setupContent() {

  const tpl = nunjucks.render('icons/_icons_list.html', { data: icons_list });
  const page = document.getElementById('icons-content');

  page.innerHTML = tpl;
},

};

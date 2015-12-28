import { BasePage } from 'js/pages/BasePage';
import request from 'then-request';


export const PressPage = {

  __proto__: BasePage,

init() {
  console.log(`reviews init started`);
  // this.__proto__.init();
  this.setupTemplates();
},

setupTemplates() {
  console.log(`setting up templates`);

  request('GET', 'http://localhost:3003/press').done(function (res) {
    const data = JSON.parse(res.getBody());
    const tpl = nunjucks.render('press_item.html', { data: data });
    const page = document.getElementById('page');

    page.innerHTML = tpl;
  });
},

};

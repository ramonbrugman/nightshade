import { BasePage } from 'js/pages/BasePage';
import request from 'then-request';


export const ReviewsPage = {

  __proto__: BasePage,

init() {
  console.log(`reviews init started`);
  // this.__proto__.init();
  this.setupTemplates();
},

setupTemplates() {
  console.log(`setting up templates`);

  request('GET', 'http://localhost:3002/reviews').done(function (res) {
    var data = JSON.parse(res.getBody());
    var tpl = nunjucks.render('review_item.html', { reviews: data });
    var page = document.getElementById('page');

    page.innerHTML = tpl;
  });
},

};

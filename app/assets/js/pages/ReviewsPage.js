// import { BasePage } from 'assets/js/pages/BasePage';
import request from 'then-request';


export const ReviewsPage = {

  // __proto__: BasePage,

init() {
  console.log(`reviews init started`);
  // this.__proto__.init();
  this.setupTemplates();
},

setupTemplates() {
  console.log(`setting up templates`);

  request('GET', 'http://localhost:3003/reviews').done(function (res) {
    const data = JSON.parse(res.getBody());
    const tpl = nunjucks.render('review_item/review_item.html', { reviews: data });
    const page = document.getElementById('content');

    page.innerHTML = tpl;
  });
},

};

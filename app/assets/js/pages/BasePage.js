export const BasePage = {

init() {
  console.log(` base page activated `);

  // Configure nunjucks
  nunjucks.configure([`app/modules/`, `node_modules/@casper/`], { autoescape: true, watch: false });

},

};

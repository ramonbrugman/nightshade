export const BasePage = {

init() {
  console.log(` base page activated `);

  // Configure nunjucks
  nunjucks.configure(`app/modules/`, { autoescape: true, watch: false });

},

};

import { BasePage } from 'assets/js/pages/BasePage';
import fs from'fs';

export const ColorPage = {

  __proto__: BasePage,

init() {
  console.log(`color init started`);

  this.__proto__.init();
  this.setupContent();

  console.log(`color init completed`);

},

loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './node_modules/@casper/nightshade-styles/modules/color/config.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 },

setupContent() {
  this.loadJSON(function(response) {
    // Parse JSON string into object
    const data = JSON.parse(response);

    console.log(data.primary);
    // const tpl = nunjucks.render('color/color_palette.html', { data: data });
    // const page = document.getElementById('swatch-content');
    // page.innerHTML = tpl;

    const swatch_gray_tpl = nunjucks.render('color/color_swatch.html', { data: data.stacks});
    const swatch_gray = document.getElementById('swatch-stacks');


    swatch_gray.innerHTML = swatch_gray_tpl;

  });
},

};

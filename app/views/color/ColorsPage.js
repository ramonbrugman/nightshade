/**
 * @overview Renders colors page swatches
 * @module ColorPage.js
 * @todo Move loadJSON to util/helpers
*/

import { PatternPage } from 'views/layout/PatternPage.js';
import fs from'fs';

export const ColorPage = {

  __proto__: PatternPage,

init() {
  console.log(`color init started`);

  this.__proto__.init();
  // this.setupContent(); Needs to be rethought for new structure

  console.log(`color init completed`);
},

loadJSON(callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '/node_modules/@casper/nightshade-core/src/color/lib/config.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
},

setupContent() {
  this.loadJSON(function(response) {
    const data = JSON.parse(response);
    const tpl = nunjucks.render('color/_color_swatch.html', { data: data.stacks});
    const content = document.getElementById('swatch-stacks');

    content.innerHTML = tpl;
  });
},

};

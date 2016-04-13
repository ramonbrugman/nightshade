/**
 * @overview WebFont loader. Uses typography.com storefront-static package
*/

WebFontConfig = {
  custom: {
    families: [
      'Verlag A',
      'Verlag B',
      'Chronicle Deck A',
      'Chronicle Deck B',
      'Calibre Light',
      'Calibre Medium'
    ],
    urls: ['//cloud.typography.com/6021872/6049352/css/fonts.css']
  },
  timeout: 20000,
  active: function() {
    sessionStorage.fontsLoaded = true;
  }
};

if (sessionStorage.fontsLoaded) {
  document.documentElement.className += ' wf-active';
}

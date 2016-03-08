/**
 * @overview WebFont loader. Uses typography.com storefront-static package
*/

WebFont.load({
  custom: {
    families: [
      'Verlag A',
      'Verlag B',
      'Chronicle Deck A',
      'Chronicle Deck B'
    ],
    urls: ['//cloud.typography.com/6021872/6049352/css/fonts.css']
  },
  active: function() {
    sessionStorage.fonts = true;
  }
});

if (sessionStorage.fonts) {
  document.documentElement.classList.add('wf-active');
}

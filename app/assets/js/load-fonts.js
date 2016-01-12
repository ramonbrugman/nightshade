// Set up custom fonts with Web Font Loader

WebFont.load({
  custom: {
    families: [
      'Verlag A',
      'Verlag B',
      'Verlag Black A',
      'Verlag Black B',
      'Chronicle Deck A',
      'Chronicle Deck B',
      'Chronicle SSm A',
      'Chronicle SSm B'
    ],
    urls: ['//cloud.typography.com/6021872/737368/css/fonts.css']
  },
  active: function() {
    sessionStorage.fonts = true;
  }
});

if (sessionStorage.fonts) {
  document.documentElement.classList.add('wf-active');
}

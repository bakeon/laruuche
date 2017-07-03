/**
 * Created by POL on 29/06/2017.
 */
'use strict';


(function () {

  var config = {
    apiKey: "AIzaSyD_6yd3uKeFxo6Q-RVtnBfp3NHzzeEkA3Q",
    authDomain: "app-laruuche.firebaseapp.com",
    databaseURL: "https://app-laruuche.firebaseio.com",
    projectId: "app-laruuche",
    storageBucket: "app-laruuche.appspot.com",
    messagingSenderId: "613195773506"
  };

  firebase.initializeApp(config);


  var body = $('body');
  body.on('click', '.playVideoInLightbox, #closeLightboxVideo, .lightbox-shadow', function () {
    body.toggleClass('lightbox-open');
    $('.lightbox').html('');
    $('.lightbox').html(templateKnow[1].lightbox);
  });

  body.on('click','.condition',function () {
    body.toggleClass('lightbox-open');
    $('.lightbox').html('');
    $.get('views/mentions.mst', function (template) {
      let rendered = Mustache.render(template);
      $('.lightbox').html(rendered);
    });
  });
})();


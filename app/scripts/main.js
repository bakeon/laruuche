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


  let body = $('body');
  body.on('click', '.playVideoInLightbox, #closeLightboxVideo, .lightbox-shadow', function () {
    body.toggleClass('lightbox-open');
  });


  /*Cookie bar*/
  let acceptedCookie = Cookies.get('acceptedCookie');
  if(acceptedCookie == 'true'){
    /*Start to write cookies*/
    let body = $('body');
    //Tutorial for Gif
    body.on('focus', '#input-message', function () {
        let gifTutorial = Cookies.get('gifTutorial');
        if(gifTutorial != 'true'){
          let text = '<div id="gif-tutorial">' +
            '<div layout="row" layout-align="center center">'+
              '<span id="gif-tutorial-close">X</span>'+
              '<h5>Les gifs !</h5>'+
              '<img src="https://media.giphy.com/media/ToMjGpxSDDBI4w7YEZa/giphy.gif" width="200px">'+
              '<p>Vous pouvez enfin utiliser les gifs sur notre application!<br> Il suffit d\'écrire "/gif miel".</p>'+
            '</div>'+
          '</div>';
          if(!document.getElementById('gif-tutorial')){
            $('body').append(text);
          }

        }
        body.on('click', '#gif-tutorial-close',function () {
          Cookies.set('gifTutorial', true, {expires: 365 });
          $(this).parent().parent().remove();
        });
    });
  }
  else{
    let body = $('body');
    let text = '<div id="cookie-bar">' +
      '<div layout="row" layout-align="center center">' +
      '<p flex="70">Ce site utilise des cookies pour améliorer l\'expérience de navigation et fournir des fonctionnalités supplémentaires.</p>'+
      '<md-button flex="20" class="md-ruuche" id="acceptCookie">Autoriser les cookies</md-button>'+
      '</div>' +
      '</div>';
    body.append(text);

    body.on('click', '#acceptCookie', function () {
      Cookies.set('acceptedCookie', true, {expires: 365 });
      $('body #cookie-bar').remove();
    });
  }

})(jQuery);




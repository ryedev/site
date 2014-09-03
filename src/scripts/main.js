'use strict';

function toggleGif(){
  var img = '/images/gif-still.png';
  var gif = 'https://s3.amazonaws.com/uploads.hipchat.com/31349/802592/UlOyMX96CY22HHC/Success.gif';

  $('.play-gif').click(function(){
    if (($(this).attr('src')) === img) {
      $(this).attr('src', gif);
    }
    else if (($(this).attr('src')) === gif) {
      $(this).attr('src', img);
    }
  });
}

$(document).ready(function(){
  $('#tagline').fitText(1.2, { minFontSize: '22px', maxFontSize: '60px' });
  $('#sub-tag-text').fitText(3, { minFontSize: '10px', maxFontSize: '18px' });
  $('#main-content-hl').fitText(3, { minFontSize: '20px', maxFontSize: '56px' });
  $('#main-content-sub-hl').fitText(3, { minFontSize: '10px', maxFontSize: '18px' });
  
  toggleGif();
});

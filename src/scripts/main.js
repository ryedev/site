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
  $('#tagline').fitText(1.1, { minFontSize: '30px', maxFontSize: '72px' });
  $('#sub-tag-text').fitText(3, { minFontSize: '11px', maxFontSize: '18px' });
  $('#main-content-hl').fitText(3, { minFontSize: '20px', maxFontSize: '56px' });
  $('#main-content-sub-hl').fitText(3, { minFontSize: '10px', maxFontSize: '18px'});
  
  // thanks to james padolsey for help with this cross-browswer doc height
  $.getDocHeight = function(){
       var D = document;
       return Math.max(Math.max(D.body.scrollHeight,    D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
  };
  var docHeight = $.getDocHeight();
  
  // runs function to toggle gif on main page
  toggleGif();

  // removes border from last case study
  $('.case-study:last-child').find('.row').css('border', 'none');

  // if(docHeight > 1000) {
  //   $('.footer-bottom').find('.logo').css({display: 'inline-block'});
  // }
});

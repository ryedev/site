'use strict';
// preload the gif and image
var img = new Image();
img.src = '/images/gif-still.png';
var gif = new Image();
gif.src = '/images/doughertygif.png';


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

  // since the gif and img are both in memory, we can swap out 
  // the html of the container to reference the awesome dougherty gif
  // without that weird delay
  $('.gif-wrapper').click(function(event){
    if($(event.currentTarget).data("gif") == "inactive") {
      $(".gif-wrapper").html(gif)
      $(event.currentTarget).data("gif", "active")
    } else {
      $(".gif-wrapper").html(img)
      $(event.currentTarget).data("gif", "inactive")
    }
  });
  // removes border from last case study
  // this is kinda gross and should be css instead of jquery
  $('.case-study:last').find('.row').css('border', 'none');

  // if(docHeight > 1000) {
  //   $('.footer-bottom').find('.logo').css({display: 'inline-block'});
  // }



  $('.send-form').hide()

  $('.share-link-button').click(function(){
    console.log('clicked share link')
    if ($('.send-form').hasClass('visible')) {
      $('.share-link-button span').text('share')
      $('.send-form').slideUp(600)
      $('.send-form').removeClass('visible')
    } else {
      $('.share-link-button span').text('hide')
      $('.send-form').slideDown(600)
      $('.send-form').addClass('visible')
    }
  })

  function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
      return true
    else  // If another browser, return 0
      return false    
  }

  // runs pagination script if at /projects
  if(window.location.href.split("/")[3] == "projects" && !isIE()){
    paginate.init()  
  } else {
    $(".case-study").addClass("active")
    $(".case-study").addClass("ie-fallback")
    $(".pagination-container").hide()
  }
  
});


// Send a link to the Contractor profile
$('.send-link button').click(function() {
// If there is no recipient alert to fill in that field
  function testEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  var emailIsGood = testEmail($('.recipient').val())
  if (!emailIsGood) {
  alert('You must enter a valid recipient\'s email address to send')
  } else {
    console.log("email good, else entered")
  // Add input values to a mailto
  var profileRecipient = $('.recipient').val();
  var profileSubject = $('.subject').val();
  var profileMessage = $('.message').val();
      $(".send-link").attr('href',"mailto:" + profileRecipient + "?subject=" + profileSubject + "&body=" + profileMessage);
      // Clear recipient field
      $('.recipient').val('');
      console.log(profileMessage + " " + profileRecipient + " " + profileSubject)
  }
})



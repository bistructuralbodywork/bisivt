// Back-to-top function

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
      $('#back-to-top').fadeIn(200);
    } else {
      $('#back-to-top').fadeOut(200);
    }
  });
  // scroll body to 0px on click
  $('#back-to-top').on('click touch', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

});

// Floating email UI

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#email-box').fadeIn(200);
    } else {
      $('#email-box').fadeOut(200);
    }
  });
});

//Header link to index

document.getElementById('header').onclick = function () {
  window.location = './index.html';
};


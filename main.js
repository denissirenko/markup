import $ from 'jquery';
window.$ = window.jQuery = $;

jQuery(function () {
  $('.burger-menu').on('click', function () {
    $('.menu-icon').toggleClass('open');
    $('.header-mobile-menu').toggleClass('open');
    $('body').toggleClass('overflow');
  });
});

let mobileMenu = false;

$(window).on('load resize', function () {
  if (window.innerWidth < 1025) {
    if (!mobileMenu) {
      $('.menu, .btn-block').wrapAll("<div class='header-mobile-menu'></div>");
      mobileMenu = true;
    }
  } else {
    if ($('.header-mobile-menu').hasClass('open')) {
      $('.burger-menu').trigger('click');
    }

    if (mobileMenu) {
      $('.menu, .btn-block').unwrap();
      mobileMenu = false;
    }
  }
});

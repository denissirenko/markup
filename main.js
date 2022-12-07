import $ from 'jquery';
window.$ = window.jQuery = $;

import Inputmask from 'inputmask';
import intlTelInput from 'intl-tel-input';
import validate from 'jquery-validation';

jQuery(function () {
  var swiper = new Swiper('.swiper', {
    spaceBetween: 17,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      440: {
        slidesPerView: 1.5,
      },
      600: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4.5,
      },
    },
  });

  const input = document.querySelector('#phone');
  intlTelInput(input, {
    preferredCountries: ['ua', 'us', 'gb'],
    separateDialCode: true,
  });

  $('#form').validate({
    errorElement: 'span',
    submitHandler: function (form) {
      var formdata = $(form).serialize();
    },
  });

  $('input[type=tel]').each(function () {
    $(this).keypress(function (e, a) {
      if (e.which == 13 || e.keyCode == 13) {
        $(this).blur();
      }
      return true;
    });
  });

  Inputmask({
    mask: '99 999 9999',
    clearMaskOnLostFocus: true,
    clearIncomplete: true,
    showMaskOnHover: false,
  }).mask('input[type=tel]');

  $('.burger-menu').on('click', function () {
    $('.menu-icon').toggleClass('open');
    $('.header-mobile-menu').toggleClass('open');
    $('body').toggleClass('overflow');
  });

  $('.open-modal-js').click(function () {
    var popup = $(this).attr('data-popup');

    $(document).one('keydown', function (e) {
      if (e.keyCode == 27) {
        $('.popup').removeClass('open');
        $('.side-popup').removeClass('open');
        $('body').removeClass('hidden');
      }
    });

    if ($('.popup').is('.open')) {
      $('.popup').removeClass('open');
      $('body').removeClass('hidden');
    }

    $('.' + popup).addClass('open');
    $('body').addClass('overlay');
    setTimeout(function () {
      $('.' + popup)
        .find('.form-input')[0]
        .focus();
    }, 1000);

    $('.popup-close').click(function () {
      $('.' + popup).removeClass('open');
      $('body').removeClass('overlay');
    });
  });

  $(document).click(function (e) {
    var el = $(e.target);
    if (el.hasClass('popup open')) {
      el.removeClass('open');
      $('body').removeClass('overlay');
    }
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

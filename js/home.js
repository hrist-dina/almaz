$(document).ready(function(){
  $('.first__tab').on('click', function(e) {
    e.preventDefault();
    let elIndex = $(this).index();
    let dataTab = $('[data-tab]').eq(elIndex);

    $('.first__tab').removeClass('current');
    $(this).addClass('current');

    if (elIndex != 0) {
      window.scrollToPos($(dataTab).offset().top - 120);
    } else {
      window.scrollToPos(0);
    }
  });

  $(window).on('scroll', function(e) {
    let docScroll = $('body,html').scrollTop();
    $('[data-tab]').each(function(i,item) {
      if ($(item).offset().top - 125 < docScroll && docScroll < ($(item).offset().top + $(item).height()) ) {
        $('.first__tab').removeClass('current');
        $('.first__tab').eq(i).addClass('current');
      }
    });

    if ($('[data-tab]').last().offset().top < docScroll) {
      $('.first__tabs').addClass('close');
    } else {
      $('.first__tabs').removeClass('close');
    }
  })
});

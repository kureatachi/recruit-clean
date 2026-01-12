$(function () {
  // 下から上にフェイドイン
  $('.fade_in').one('inview', function (event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).stop().addClass('in');
    } else {
      $(this).stop().removeClass('in');
    }

  });


});

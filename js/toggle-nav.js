// toggleNav

$(function () {
  $('.menu,.menu-under').on('click', function () {
    $('.menu__line').toggleClass('active');
    $('.nav-cover').fadeToggle();
  });
});

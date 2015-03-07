$('*').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function () {
    $(this).trigger('transition-end');
});

var randomTimeout = function randomTimeout(elem,fn){
  $(elem).each(function(){
      var timer = Math.random() * (350 - 0) + 0;
      setTimeout(function(elem){
        fn(elem);
      },timer,$(this));
    });
}

$(function(){
  $('.page__container').on('click','div[class^="project__item"]',function(){
    var _this = $(this);

    randomTimeout('.project > div',function(elem){
      elem.addClass('project__item--hide');
    });
    $('.project__inline').addClass('project__inline--show')
      .one('transition-end',function(){
        randomTimeout('.project > div',function(elem){
          elem.removeClass('project__item--hide');
        });
      });
    $('.overlay').addClass('overlay--show');
  });
});
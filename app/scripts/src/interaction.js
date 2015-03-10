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

var ww = $(window).width();

var gallery = {

  init : function(){
    var count = $('.project__inline__item').css('width',ww + 'px').length;
    $('.project__inline__inner').css('width',count * ww + 'px');
    $('.project__inline').css('height',$('.project__inline__inner').css('height'));
  },
  next : function(){},
  prev : function(){}

};

$(function(){

  if($('.project__inline').length){
    $('.page__container').on('click','div[class^="project__item"]',function(){
      var _this = $(this);    
      $('.overlay').addClass('overlay--show');
      $('.project__inline').addClass('project__inline--show');
    });

    gallery.init();
  }



});
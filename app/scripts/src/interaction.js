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

var infoverlay = {

  init : function(){
    $('.icon-info, .project__detail .icon-close').on('click',function(e){
      e.preventDefault();
      $('.overlay').toggleClass('overlay--show');
      $('.project__detail').toggleClass('project__detail--show');
    })
  }

}

var gallery = {
  container : 0,
  items : 0,
  curIndex : 0,
  init : function(){
    gallery.container = $('.project__inline');
    gallery.items = $('.project__inline__item');
    $('.page__container').on('click','div[class^="project__item"]',gallery.open);
    $(window).on("resize",gallery.refresh);
    gallery.refresh();
    gallery.container.css('height',$('.project__inline__inner').css('height'));
  },
  refresh : function(){
    var ww = $(window).width();
    var items = $('.project__inline__item');
    $('.project__inline__inner').css('width',ww*items.length+'px').addClass('loaded');
    items.css('width',ww+'px');
  },
  open : function(){
    var _this = $(this);    
    $('.overlay').addClass('overlay--show').off('click').on('click',function(){
      console.log('overlay clicked');
    });
    gallery.container.addClass('project__inline--show');
  },
  close : function(){
    $('.overlay').removeClass('overlay--show');
    gallery.container.removeClass('project__inline--show');
  },
  next : function(){
    if(gallery.curIndex < gallery.items.length){
      gallery.curIndex ++;
    }else{
      gallery.curIndex = 0;
    }
    gallery.go();
  },
  prev : function(){
    if(gallery.curIndex > 0){
      gallery.curIndex --;
    }else{
      gallery.curIndex = gallery.items.length;
    }
    gallery.go();
  },
  go : function(){
    gallery.container.css('marginLeft',gallery.curIndex *-1 *ww +'px');
  }

};

var paginate = {
  currentPos : 0,
  pages : [],
  init : function(){
    $(window).on('stateUpdate',paginate.pop);
    $.ajax({
      url : "/pages.json"
    }).done(function(data){
      paginate.pages = data;
      $.each(data,function(k,v){
        if(window.location.href.indexOf(v) > -1){
          paginate.currentPos = k;
        }
      })
    });

    $('*[data-click-next]').on('click',function(e){
      e.preventDefault();
      paginate.loadNext();
    });

    $('*[data-click-prev]').on('click',function(e){
      e.preventDefault();
      paginate.loadPrev();
    });
  },
  loadNext : function(){
    var nextKey = paginate.currentPos +1;
    var next;
    if ( typeof paginate.pages[ nextKey ] === "undefined" ){
      nextKey = 0;
    }
    next = paginate.pages[ nextKey ];
    if( next.length > 0 ){
      next = next+"/";
    }
    paginate.currentPos = nextKey;
    history.pushState({ direction : 'next' }, '', '/'+next);
    $(window).trigger('stateUpdate');
    /*paginate.loadPage( next , function(data){
      var page = $(data).find('.page__inner').html();
      $('.page__inner').append(page).animate({
        'marginLeft':ww*-1+'px'
      },500);
    })*/
  },
  loadPrev : function(){
    var prevKey = paginate.currentPos -1;
    var prev;
    if ( typeof paginate.pages[ prevKey ] !== "undefined" ){
      prevKey = paginate.pages.length;
    }
    prev = paginate.pages[ prevKey ];
    if( prev.length > 0 ){
      prev = prev+"/";
    }
    paginate.currentPos = prevKey;
    history.pushState({ direction : 'prev' }, '', '/'+prev+'/');
    $(window).trigger('stateUpdate');
  },
  loadPage : function(url, callback){
    $.ajax({
      url : url
    }).then(callback);
  },
  pop : function(){
    var state = history.state;
    console.log(state);
    var direction = state.direction;
    console.log(direction);
    paginate.loadPage(window.location.href,function(data){
      var page = $(data).find('.page__inner').html();
      if(direction == "next"){
        $('.page__inner').append(page).animate({
          'marginLeft':ww*-1+'px'
        },500);
      }else{
        $('.page__inner').prepend(page).animate({
          'marginLeft':ww+'px'
        },500);
      }
    })
  }
};

$(function(){

  if($('.project__inline').length){
    gallery.init();
  }

  paginate.init();
  infoverlay.init();

});
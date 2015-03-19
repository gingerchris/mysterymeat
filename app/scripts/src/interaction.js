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
var wh = $(window).height();

var gallery = {
  mp : 0,
  init : function(){
    gallery.mp = $('.project__tiles').magnificPopup({
      delegate: 'a:not(.stopGallery)', // child items selector, by clicking on it popup will open
      type: 'image',
      mainClass: 'mfp-fade',
      removalDelay: 1000,
      closeMarkup: '<button title="%title%" class="mfp-close"><i class="mfp-close-icn"></i></button>',
      gallery : {
        enabled:true,
        navCaption : true,
        arrowMarkup: '<a href="#" title="%title%" class="icon-arrow-%dir%"></a>', // markup of an arrow button
      },
      callbacks : {
        close : function(){
          paginate.resetState();
        }
      }
    });

    $('body').on('click','a.stopGallery',function(e){
      e.preventDefault();
    })

    if(window.location.href.indexOf('?') > -1){
      var index = window.location.href.slice(window.location.href.indexOf('?'));
      index = index.replace('?','');
      index = index.replace('#','');
      index = parseInt(index,10) -1;
      $('.project__tiles > div').eq(index).find('a').click();
    }
  }
}

var infoverlay = {

  init : function(){
    $('.icon-info, .project__detail .icon-close').on('click',function(e){
      e.preventDefault();
      $('.overlay').toggleClass('overlay--show').data('showing','.project__detail');
      $('.project__detail').toggleClass('project__detail--show');
      if($('.project__detail').hasClass('project__detail--show')){
        disableScroll();
      }else{
        enableScroll();
      }
    })
  }

}

var paginate = {
  currentPos : 0,
  pages : [],
  init : function(){
    $(window).on('stateUpdate',paginate.pop);
    $(window).on('popstate',paginate.pop);

    $.ajax({
      url : "/pages.json"
    }).done(function(data){
      $.each(data, function(k,v){
        paginate.pages.push(v);
      })
      paginate.addListings();

      var state = false;
      $.each(paginate.pages,function(k,v){
        if(v.length > 0 && window.location.href.indexOf(v) > -1 && !state){
          paginate.currentPos = k;
          if(v.length > 0){
            v += "/";
          }
          state = true;
          if( history.state == null ){
            history.pushState({ page : true, key : k }, '', '/'+v);
          }else if(history.state.key !== k){
            history.pushState({ page : true, key : k }, '', '/'+v);
          }
        }
      })
      if(!state){
        history.pushState({ page : true , key : 0 }, '', '/');
      }
    }).fail(function(err,data){
      console.log(data);
    });

    $('body').on('click','*[data-click-next]',function(e){
      e.preventDefault();
      paginate.loadNext();
    });

    $('body').on('click','*[data-click-prev]',function(e){
      e.preventDefault();
      paginate.loadPrev();
    });
  },
  resetState : function(){
    history.pushState({ page : true , key : paginate.currentPos }, '', '/'+paginate.pages[paginate.currentPos]);
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
    history.pushState({ page : true, key : nextKey }, '', '/'+next);
    $(window).trigger('stateUpdate');
  },
  loadPrev : function(){
    var prevKey = paginate.currentPos -1;
    var prev;
    if ( typeof paginate.pages[ prevKey ] === "undefined" ){
      prevKey = paginate.pages.length;
    }
    prev = paginate.pages[ prevKey ];
    if( prev.length > 0 ){
      prev = prev+"/";
    }
    history.pushState({ page : true, key : prevKey }, '', '/'+prev);
    $(window).trigger('stateUpdate');
  },
  loadPage : function(url, callback){
    $.ajax({
      url : url
    }).then(callback);
  },
  addListings : function(){
    var listing = $('.mm__projects ul')
    $.each(paginate.pages,function(k,v){
      if(v == "") return;
      listing.append('<li><a href="/'+v+'/"><img src="/'+v+'/square.png" /><span>'+k+'</span></a></li>');
    })
  },
  pop : function(e){
    var state = history.state;
    var direction;
    var timeout;
    if(state !== null  && state.page && state.key !== paginate.currentPos){
      var newKey = state.key;
      if(newKey > paginate.currentPos){
        direction = "next";
      }else{
        direction = "prev";
      }      
      paginate.loadPage(window.location.href,function(data){
        var page = $(data).find('.page__inner').html();
        $('.page__inner').css('width',ww*2+'px');
        if(direction == "next"){
          $('.page__inner').append(page).animate({
            'marginLeft':ww*-1+'px'
          },500);
          timeout = function(){
            $('.page:first').remove();
            $('.page__inner').css({
              'marginLeft':'0',
              'width' : ww+'px'
            });
            paginate.initNext();
          }
        }else{
          $('.page__inner').css('marginLeft',ww*-1+'px')
            .prepend(page)
            .animate({
              'marginLeft':'0px'
            },500);
          timeout = function(){
            $('.page:last').remove();
            $('.page__inner').css('width',ww+'px');

            paginate.initNext();
          }
        }
        setTimeout(timeout,520);
        paginate.currentPos = newKey;
      })
    }else if(state !== null && paginate.currentPos == state.key){
      return false;
    }
  },
  initNext : function(){
    gallery.init();
    infoverlay.init();
  }
};

var swipe = {
  pageX : 0,
  bounds : {
    startLeft : 0,
    bumpLeft : 0,
    startRight : 0,
    bumpRight : 0,
  },
  init : function(){
    $('body').on('mousedown','.page',swipe.start);
    $('body').on('mouseup','.page',swipe.end);
    $('body').swipe({
      swipeLeft : paginate.loadNext,
      swipeRight : paginate.loadPrev
    });
  },
  start : function(e){
    swipe.pageX = e.clientX;
    $('body').on('mousemove',swipe.move);
  },
  end : function(e){
    $('body').off('mousemove',swipe.move);
    $('.page').animate({'marginLeft':0},250);
    var distance = e.clientX - swipe.pageX;
    if(distance > 50){
      paginate.loadPrev();
      e.stopImmediatePropagation();
      $.magnificPopup.close();
    }else if(distance < -50){
      paginate.loadNext();
      e.stopImmediatePropagation();
      $.magnificPopup.close();
    }
    setTimeout(function(){
      $('.stopGallery').removeClass('stopGallery');
    },50);
  },
  move : function(e){
    e.preventDefault();
    $(e.target).parent('a').addClass('stopGallery');
    var distance = e.clientX - swipe.pageX;
    $('.page').css('marginLeft', distance/10 + 'px');
  }
}

function disableScroll(){
  $('html').addClass('noscroll');
}

function enableScroll(){
  $('html').removeClass('noscroll');
}

$(function(){

  $(window).on('resize',function(){
    ww = $(window).width();
    wh = $(window).height();
  })

  if($('.project__tiles').length){
    gallery.init();
  }

  paginate.init();
  infoverlay.init();
  swipe.init();

  $('footer a.icon-mm').on('click',function(e){
    e.preventDefault();
    $('.mm_about').addClass('mm_about--show');
    $('.overlay').addClass('overlay--show').data('showing','.mm_about--show');
    $('.home__inner').addClass('home__inner--hide');
    disableScroll();
  });

  $('.mm_about .icon-close').on('click',function(e){
    e.preventDefault();
    $('.mm_about').removeClass('mm_about--show');
    $('.overlay').removeClass('overlay--show');
    $('.home__inner').removeClass('home__inner--hide');
    enableScroll();
  });

  $('footer a.icon-cleaver').on('click',function(e){
    e.preventDefault();
    $('.mm__projects').addClass('mm__projects--show');
    $('.overlay').addClass('overlay--show').data('showing','.mm__projects--show');
    $('.home__inner').addClass('home__inner--hide');
    disableScroll();
  });

  $('.mm_about .icon-close').on('click',function(e){
    e.preventDefault();
    $('.mm__projects').removeClass('mm__projects--show');
    $('.overlay').removeClass('overlay--show');
    $('.home__inner').removeClass('home__inner--hide');
    enableScroll();
  });

  $('body').on('click','.overlay--show',function(){
    var remClass = $(this).data('showing');
    $(remClass).removeClass(remClass.replace('.',''));
    $(this).removeClass('overlay--show');
    $('.home__inner').removeClass('home__inner--hide');
  })

});
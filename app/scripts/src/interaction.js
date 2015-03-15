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
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
      mainClass: 'mfp-fade',
      removalDelay: 1000,
      closeMarkup: '<button title="%title%" class="mfp-close"><i class="mfp-close-icn"></i></button>',
      gallery : {
        enabled:true,
        navCaption : true,
        arrowMarkup: '<a href="#" title="%title%" class="icon-arrow-%dir%"></a>', // markup of an arrow button
      }
      // other options
    });

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
          if(history.state.key !== k){
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
    if ( typeof paginate.pages[ prevKey ] !== "undefined" ){
      prevKey = paginate.pages.length;
    }
    prev = paginate.pages[ prevKey ];
    if( prev.length > 0 ){
      prev = prev+"/";
    }
    history.pushState({ page : true, key : prevKey }, '', '/'+prev+'/');
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
    if(state.page && state.key !== paginate.currentPos){
      var newKey = state.key;
      if(newKey > paginate.currentPos){
        direction = "next";
      }else{
        direction = "prev";
      }      
      paginate.loadPage(window.location.href,function(data){
        var page = $(data).find('.page__inner').html();
        if(direction == "next"){
          $('.page__inner').append(page).animate({
            'marginLeft':ww*-1+'px'
          },500);
          timeout = function(){
            $('.page:first').remove();
            $('.page__inner').css('marginLeft','0');
          }
        }else{
          $('.page__inner').css('marginLeft',ww*-1+'px').prepend(page).animate({
            'marginLeft':'0px'
          },500);
          timeout = function(){
            $('.page:last').remove();
          }
        }
        setTimeout(timeout,520);
        paginate.currentPos = newKey;
        gallery.init();
        infoverlay.init();
      })
    }else if(paginate.currentPos == state.key){
      return false;
    }
  }
};

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
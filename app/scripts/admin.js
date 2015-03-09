$.fn.resetInput = function() {
  var form = this.parents('form');
  form.get(0).reset();
  $('#itemAlt').val($('.active').data('alt'));
  $('#itemAlt2').val($('.active').data('alt2'));
  return this;
};

function readURL(input,img) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            img.attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

var lb = {
  ct : $('#layout'),
  init : function(){
    $('#blocks').on('click','li',function(){
      $('#iteminfo').removeClass('hide');
      $('.active').removeClass('active');
      var append = $('<div class="s'+$(this).html()+' new active" />');
      if($(this).html() == "1x1"){
        lb.activeDouble();
        append.html("<img /><img />");
      }else{
        lb.activeSingle();
        append.html("<img />");
      }
      append.data('side','1');
      append.data('float','left');
      lb.ct.append(append);
      append.draggable({
        snap : '#layout',
        grid : [200,100],
        stop: lb.drop
      })
    });

    lb.ct.on('click','div',function(){
      $('.active').removeClass('active');
      $(this).addClass('active');
      if($(this).hasClass('s1x1')){
        lb.activeDouble();
      }else{
        lb.activeSingle();
      }
    });

    $('#title, #blurb').on('change',lb.constructJSON);
  },
  activeDouble : function(){
    $('.double').removeClass('hide');
    $('#itemAlt').resetInput().off('change').on('change',function(){
      $('.active').data('alt',$(this).val());
      lb.constructJSON();
    });
    $('#itemFile').resetInput().off('change').on('change',function(){
      $('.active').data('file',$(this).val().replace(/^.*[\\\/]/, ''));
      readURL(this,$('.active').find('img:first-child'));
      lb.constructJSON();
    });
    $('#itemAlt2').resetInput().off('change').on('change',function(){
      $('.active').data('alt2',$(this).val());
      lb.constructJSON();
    });
    $('#itemFile2').resetInput().off('change').on('change',function(){
      $('.active').data('file2',$(this).val().replace(/^.*[\\\/]/, ''));
      readURL(this,$('.active').find('img:nth-child(2)'));
      lb.constructJSON();
    });
  },
  activeSingle : function(){
    $('.double').addClass('hide');
    $('#itemAlt').resetInput().off('change').on('change',function(){
      $('.active').data('alt',$(this).val());
      lb.constructJSON();
    });
    $('#itemFile').resetInput().off('change').on('change',function(){
      $('.active').data('file',$(this).val().replace(/^.*[\\\/]/, ''));
      readURL(this,$('.active').find('img'));
      lb.constructJSON();
    });
  },
  drop : function(event, ui){
    var left = ui.position.left;
    var top = ui.position.top;
    if(top%100 !== 0){
      top = top - (top%100);
      ui.helper.css('top',top+'px');
    }
    if(left%100 !== 0){
      left = left - (left%100);
      ui.helper.css('left',left+'px');
    }
    if(left >= 200){
      ui.helper.data('side','-1');
      ui.helper.data('float','right');
    }
    ui.helper.data('top',ui.offset.top)
    .removeClass('new');
    lb.sort();
  },
  sort : function(){
    var elems = lb.ct.find('div');
    elems.sort(function(a,b){
      if($(a).data('top') > $(b).data('top')){
        return 1;
      }

      if($(a).data('top') < $(b).data('top')){
        return -1;
      }

      if($(a).data('top') == $(b).data('top')){

        if($(a).data('side') > $(b).data('side')){
          return 1;
        }

        if($(a).data('side') < $(b).data('side')){
          return -1;
        }

      }

      return 0;
    })
    .each(function(){
      $(this).attr('style','')
      .css({
        float: $(this).data('float')
      })
    })
    elems.detach().appendTo(lb.ct);
    lb.constructJSON();
  },
  constructJSON : function(){
    var json = {};
    var items = [];
    lb.ct.find('div').each(function(){
      var i = [];
      if($(this).hasClass('s1x1')){
        i.push(lb.addItem($(this)));
        i.push(lb.addItem($(this),true));
      }else{
        i.push(lb.addItem($(this)));
      }
      items.push(i);
    })
    json = {
      title : $('#title').val(),
      blurb : $('#blurb').val(),
      items : items
    };
    console.log(JSON.stringify(json));
  },
  addItem : function(item, two){
    if(two){
      return {
        alt : item.data('alt2'),
        file : item.data('file2'),
        side : item.data('float')
      };
    }
    return {
      alt : item.data('alt'),
      file : item.data('file'),
      side : item.data('float')
    };
  }
}

$(function(){
  lb.init();
})

/*on select item:
    form values to data content

*/
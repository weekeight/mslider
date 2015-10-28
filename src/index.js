/*!
* jQuery MSlider Plugin v1.0.0
*
* Copyright 2015 weekeight
* Released under the MIT license
*/

(function (factory){
  if(typeof define === 'function' && define.amd){
    // AMD(Register as an anonymous module)
    define(['jquery'], factory);
  }else if(typeof exports === 'object'){
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  }else{
    //Browser globals
    factory(jQuery);
  }
}(function ($){
  // set element style after initialisation
  var _initCss = function(){
    var this$ = this;
    var data = this$.data('MSlider');
    var settings = data.settings;
    var items$ = this$.find(settings.items);
    var item$ = items$.find(settings.item);

    this$.css({
      'position': 'relative',
      'overflow': 'hidden'
    });
    items$.css({
      'width': item$.length * 100 + '%'
    });
    item$.css({
      'float': 'left',
      'width': 100/item$.length + '%'
    });
  };

  var _addBottomBar = function(){
    var this$ = this;
    var data = this$.data('MSlider');
    var settings = data.settings;
    var items$ = this$.find(settings.items);
    var item$ = items$.find(settings.item);

    var bottomBarHtml = '<ol class="dots">';

    for(var i = 0; i < item$.length; i++){
      bottomBarHtml += '<li class="dot '+ (i === 0 ? 'active' : '') +'"></li>';
    }
    bottomBarHtml += '</ol>';
    this$.append(bottomBarHtml);
  };

  var _bindEvent = function(){
    var this$ = this;
    var data = this$.data('MSlider');
    var settings = data.settings;
    var items$ = this$.find(settings.items);
    var item$ = items$.find(settings.item);

    settings.touchmove && items$.delegate(settings.item, 'mousedown.mslider touchstart.mslider', function(ev){
      ev.preventDefault();
      ev.stopPropagation();

      var currentTarget$ = $(ev.currentTarget);
      var curItemIndex = item$.index(currentTarget$);
      data.curItemIndex = curItemIndex;

      // console.log('touchstart curItemIndex:'+ data.curItemIndex);
      if(data.playTimer || data.playAgainTimer){
        methods['stop'].call(this$);
      }
      items$.css({
        WebkitTransition: '',
        transition: '',
        WebkitTransform: 'translate3d(' + -data.curItemIndex*100/item$.length + '%,0px,0px)',
        transform: 'translate3d(' + -data.curItemIndex*100/item$.length + '%,0px,0px)'
      });
      data.startPageX = (ev.originalEvent.touches ? ev.originalEvent.touches[0] : ev.originalEvent).pageX;
    });

    settings.touchmove && items$.delegate(settings.item, 'mousemove.mslider touchmove.mslider', function(ev){
      ev.preventDefault();
      ev.stopPropagation();

      var curPageX = (ev.originalEvent.touches ? ev.originalEvent.touches[0] : ev.originalEvent).pageX;
      var distance = curPageX - data.startPageX;
      var transformLeft = -data.curItemIndex * data.singleItemWidth + distance;
      data.distance = distance;
      console.log(data.singleItemWidth);
      items$.css({
        WebkitTransform: 'translate3d(' + transformLeft + 'px,0px,0px)',
        transform: 'translate3d(' + transformLeft + 'px,0px,0px)'
      });
      console.log('touchmove');

    });

    settings.touchmove && items$.delegate(settings.item, 'mouseup.mslider touchend.mslider', function(ev){
      ev.preventDefault();
      ev.stopPropagation();

      var nextIndex = data.curItemIndex;
      if(data.distance > 0){
        nextIndex = data.curItemIndex - 1 < 0 ? 0 : data.curItemIndex - 1;
      }else if(data.distance < 0){
        nextIndex = data.curItemIndex + 1 >= data.itemLength ? data.itemLength-1 : data.curItemIndex + 1;
      }else{
        nextIndex = data.curItemIndex;
      }

      methods['to'].call(this$, nextIndex);
      console.log('touchend...');
    });
  };

  var methods = {
    init: function(options){
      var self = this;
      var settings = $.extend({
        speed: 500, // ms, animation speed(integer)
        delay: 2000, // delay between slides(integer)
        dots : true, // show dots pagination(boolean)
        items: '>ul',   // slides container selector
        item: '>li',    // slidable items selector
        easing: 'ease',// easing function to use for animation
        autoplay: true,  // autoplay after initialisation
        touchmove: true // surpport touch event(boolean)
      }, options);

      return self.each(function(index){
        var this$ = $(this);
        var data = this$.data('MSlider');
        var items$ = this$.find(settings.items);
        var item$ = items$.find(settings.item);

        // If the plugin hasn't been initialized yet...
        if(!data){
          var data = {
            target: this$,
            settings: settings,
            curItemIndex: 0,
            itemLength: item$.length
          };
          this$.data('MSlider', data);

          // init style
          _initCss.call(this$);
          // add bottom nav bar
          settings.dots && _addBottomBar.call(this$);

          data.singleItemWidth = $(item$[0]).outerWidth();
          // bind touch/touchmove/touchend event
          _bindEvent.call(this$);

          settings.autoplay && methods['play'].call(this$);
        }
      });
    },
    destroy: function(){
      return this.each(function(index){
        var this$ = $(this);
        var data = this$.data('MSlider');

        //@TODO remove all events

        this$.removeData('MSlider');
      });
    },
    play: function(){
      var self = this;

      return self.each(function(index){
        var this$ = $(this);
        var data = this$.data('MSlider');

        if(data.playTimer){
          methods['stop'].call(this$);
        }
        data.playTimer = setInterval(function(){
          if(data.curItemIndex + 1 >= data.itemLength){
            data.curItemIndex = 0;
            methods['to'].call(this$, 0);
          }else{
            methods['to'].call(this$, data.curItemIndex + 1);
          }
        }, data.settings.delay);
      });
    },
    stop: function(){
      var self = this;

      return self.each(function(index){
        var this$ = $(this);
        var data = this$.data('MSlider');
        clearInterval(data.playTimer);
        clearTimeout(data.playAgainTimer);
        data.playTimer = null;
        data.playAgainTimer = null;
      });
    },
    to: function(targetItemIndex){
      var self = this;

      return self.each(function(index){
        var this$ = $(this);
        var data = this$.data('MSlider');
        var settings = data.settings;
        var items$ = this$.find(settings.items);
        var item$ = items$.find(settings.item);

        var transformLeft = -targetItemIndex * 100/item$.length;

        if(data.playTimer){
          methods['stop'].call(this$);
        }

        items$.css({
          WebkitTransition: '-webkit-transform ' + settings.speed + 'ms ' + settings.easing,
          transition: 'transform ' + settings.speed + 'ms ' + settings.easing,
          WebkitTransform: 'translate3d(' + transformLeft + '%,0px,0px)',
          transform: 'translate3d(' + transformLeft + '%,0px,0px)'
        });

        data.playAgainTimer = setTimeout(function(){
          // bottom bar dots status
          this$.find('.dots .active').removeClass('active');
          $(this$.find('.dots .dot')[targetItemIndex]).addClass('active');
          data.curItemIndex = targetItemIndex;
          settings.autoplay && methods['play'].call(this$);
        }, settings.speed);
      });
    }
  };

  $.fn.MSlider = function(method){
    if(methods[method]){
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }else if(typeof method === 'object' || !method){
      methods['init'].apply(this, arguments);
    }else{
      $.error('Method ' + method + 'does not exits on jQuery.MSlider');
    }
  }
}));

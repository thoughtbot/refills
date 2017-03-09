/*
 * Plugin Name: erToc plugin for jQuery
 * Version: 1.0
 * Author: everright.chen
 * Email: everright.chen@gmail.com
 * Website: http://everright.cn
 * Testd on: jQuery 1.4+, IE 6+, Firefox, Chrome, Safari, Oprea
 * erToc is a jQuery plugin that will automatically generate a table of contents for your page.
 */

(function($) {
    $.erToc = function(el, options) {
        var base = this;
        
        base.$this = $(el);
        
        base.init = function() {
            // merege custom options
            base.options = $.extend({}, $.erToc.defaults, options);
            
            // get nodes length, break down when have't nodes
            var nodeLength = base.options.nodes.length;
            if (!nodeLength) {
                return;
            }
            
            // get and set the last node id number from $body data
            base.nodeNum = $('body').data(base.options.nodeNumKey) || 1;
            // initialize current level, current original level, current original min level
            base.currentLevel = base.currentOriLevel = base.currentOriMinLevel = 0;
            // get is tiered output of toc
            base.tiered = base.tieredList();
            // initialize output for toc
            base.toc = '';
            
            // get start level, if value is string, then auto convert to int
            if (base.options.startLevel != parseInt(base.options.startLevel)) {
                base.options.startLevel = $.inArray(base.options.startLevel, base.options.nodes);
            } else {
                base.options.startLevel -= 1;
            }
            
            if (!base.options.startLevel || 0 > base.options.startLevel) {
                base.options.startLevel = 0;
            }
            
            // get max level, if value is string, then auto convert to int, auto set max level to nodes length when max level less than start level
            if (base.options.maxLevel != parseInt(base.options.maxLevel)) {
                base.options.maxLevel = $.inArray(base.options.maxLevel, base.options.nodes) + 1;
            }
            
            if (!base.options.maxLevel || base.options.maxLevel < base.options.startLevel) {
                base.options.maxLevel = base.options.nodes.length;
            }
            
            // check and reset the max leven with new computed
            var validLevel = nodeLength - base.options.startLevel;
            
            if (base.options.startLevel > base.options.maxLevel || validLevel < base.options.maxLevel) {
                base.options.maxLevel = validLevel;
            }
            
            // automatically broken down when the nodes does not meet the conditions
            if (!base.initNodes()) {
                return;
            }
            // initialize and append to toc output
            base.initToc();
            // append toc content to toc target element
            base.createToc();
            
            // set main scroll object when toc scroll or go to top feature was enabled
            if (base.options.goTop || base.options.tocScroll) {
                base.$body = (window.opera) ? ('CSS1Compat' ==  document.compatMode ? $('html') : $('body')) : $('html, body');
            }
            
            // initialize go to top
            if (false !== base.options.goTop) {
                // set go to top object, if not set, then set with body object
                base.$topNode = $(base.options.goTopNode);
                
                if (!base.$topNode.length) {
                    base.$topNode = $('body');
                }
                
                base.options.goTopNodes = base.options.goTopNodes || 'auto';
                
                if ('auto' === base.options.goTopNodes) {
                    base.$topNode.data('isGoTopPosition', 'yes');
                }
                
                base.addGoTop();
            }
        };
        
        /*
         * Prepare nodes
         * Min & Max conditions
         * Group nodes, sort nodes
         */
        base.initNodes = function() {
            var defaultNodes = [];
            for (var i = 0, len = base.options.nodes.length; i < len; i++) {
                defaultNodes[i] = base.options.nodes[i];
            }
            var tag,
            nodes = defaultNodes.splice(base.options.startLevel, base.options.maxLevel);
            base.$nodes = base.$this.find(nodes.join(', '));
            
            if (!base.$nodes.length || (base.options.nodeMin > 0 && base.$nodes.length < base.options.nodeMin)) {
                return false;
            }
            
            if (base.options.nodeMax > 0) {
                base.$nodes = base.$nodes.filter(':lt(' + base.options.nodeMax + ')');
            }
            
            base.nodes = {
                'ids': [], 
                'classes': [], 
                'sorts': {'ids': {}, 'classes': {}}
            };
            
            for (var i in nodes) {
                if ('.' == nodes[i].substring(0, 1)) {
                    tag = nodes[i].substring(1);
                    base.nodes.classes.push(tag);
                    base.nodes.sorts.classes[tag] = i;
                } else {
                    tag = nodes[i].toLowerCase();
                    base.nodes.ids.push(tag);
                    base.nodes.sorts.ids[tag] = i;
                }
            }
            
            return true;
        };
        
        /*
         * Prepare toc content
         */
        base.initToc = function() {
            if (base.tiered) {
                base.listO = '<' + base.options.tocListType + '>';
                base.listC = '</' + base.options.tocListType + '>';
                base.listEO = '<li>';
                base.listEC = '</li>';
                base.toc += base.listO + base.listEO;
            }
            
            var node, level, currentLevel;
            
            var numCurrLabel = '';
            if (true === base.options.numbered) {
                var numPrevLevel = 0,
                numLevelCount = {},
                numPrefix = {},
                numPrevPrefix = '',
                numLastPrefix = '';
            }
            
            base.$nodes.addClass(base.options.nodeClass).each(function(i, obj) {
                node = $(obj);
                level = base.getLevel(node);
                if (base.tiered) {
                    currentLevel = base.currentLevel;
                    
                    if (0 == i) {
                        base.currentOriLevel = level;
                        base.currentOriMinLevel = level;
                    } else {
                        if (level > base.currentOriLevel) {
                            currentLevel = base.currentLevel + 1;
                            base.currentOriLevel = level;
                        } else if (level < base.currentOriLevel) {
                            currentLevel = level <= base.currentOriMinLevel ? 0 : level - base.currentOriMinLevel;
                            base.currentOriLevel = level;
                            
                            if (level < base.currentOriMinLevel) {
                                base.currentOriMinLevel = level;
                            }
                        }
                        
                        base.toc += base.formatLevel(currentLevel, false);
                    }
                    
                    if (true === base.options.numbered) {
                        if (!numLevelCount[currentLevel] || numPrevLevel < currentLevel) {
                            numLevelCount[currentLevel] = 1;
                        } else {
                            numLevelCount[currentLevel] += 1;
                        }
                        
                        if (numPrevLevel == currentLevel) {
                            numCurrLabel = numLastPrefix + numLevelCount[currentLevel];
                        } else {
                            if (numPrevLevel < currentLevel) {
                                numLastPrefix = numPrevPrefix + base.options.numberedJoin;
                                numPrefix[currentLevel] = numLastPrefix;
                            } else{
                                numLastPrefix = '';
                            }
                            numCurrLabel = (currentLevel == 0) ? numLevelCount[currentLevel] : numPrefix[currentLevel] + numLevelCount[currentLevel];
                            
                        }
                        numPrevPrefix = numCurrLabel;
                        numCurrLabel = base.options.numberedPrefix + numCurrLabel + base.options.numberedSuffix;
                        numPrevLevel = currentLevel;
                    }
                }
                
                base.toc += base.formatLink(node, level, numCurrLabel);
                
                if (base.tiered && ((i + 1) == base.$nodes.length)) {
                    base.toc += base.formatLevel(currentLevel, true);
                }
                
                base.currentLevel = currentLevel;
            });
            
            if (base.tiered) {
                base.toc += base.listEC + base.listC;
            }
            
            // set last nodeNum for other erToc use
            $('body').data(base.options.nodeNumKey, base.nodeNum);
        };
        
        /*
         * Append toc to target element
         * title, title enable clicked, toc element scroll
         */
        base.createToc = function() {
            base.$target = $(base.options.tocTarget);
            base.$toc = $('<div class="er_toc_content"></div>').html(base.toc);
            
            if (!base.$target.length) {
                base.$target = $('<div></div>').prependTo(base.$this);
            }
            if (base.options.tocClass) {
                base.$target.addClass(base.options.tocClass);
            }
            
            base.$target.append(base.$toc);
            
            // set toc title
            var title = $.trim(base.options.tocTitle);
            
            if (title.length) {
                var $title = $('<div></div>').html(title).append('<span></span>'),
                hasTitleClass = base.options.tocTitleClass.length;
                
                if (hasTitleClass) {
                    $title.addClass(base.options.tocTitleClass);
                }
                
                // bind hide show event
                if (true === base.options.tocControl) {
                    var titleOpenClass = hasTitleClass ? base.options.tocTitleClass + '_open' : 'er_toc_title_open',
                    titleCloseClass = hasTitleClass ? base.options.tocTitleClass + '_close' : 'er_toc_title_close';
                    
                    $title.css('cursor', 'pointer').click(function() {
                        if ($(this).hasClass(titleOpenClass)) {
                            $(this).removeClass(titleOpenClass).addClass(titleCloseClass);
                            base.$toc.slideUp();
                        } else {
                            $(this).removeClass(titleCloseClass).addClass(titleOpenClass);
                            base.$toc.slideDown();
                        }
                    }).click();
                }
                
                $title.prependTo(base.$target);
            }
            
            // binkd click scroll when toc scroll is enabled
            if (base.options.tocScroll) {
                base.$toc.find('a').click(function() {
                    base.$body.animate({scrollTop: ($($(this).attr('href')).offset().top - base.options.goTopBaseHeight)}, base.options.scrollSpeed);
                    return false;
                });
            }
        };
        
        /*
         * Bind goTop action to nodes which can random, all, custom elements
         */
        base.addGoTop = function() {
            var top,
            goTop,
            text = (true === base.options.goTop) ? 'Top' : base.options.goTop;
            
            if ('all' === base.options.goTopNodes) {
                goTop = base.$nodes;
            } else if ('auto' === base.options.goTopNodes) {
                var currentTop,
                filterNodes = [],
                lastTop = 0,
                preTop = base.getPositionToTop(base.$this),
                depth = Math.round(base.$this.height() / base.$nodes.length);
                
                if (base.options.goTopDepth > depth) {
                    depth = base.options.goTopDepth;
                }
                
                base.$nodes.each(function(i) {
                    currentTop = $(this).position().top - lastTop;
                    
                    if (0 == i) {
                        currentTop += preTop;
                    }
                    
                    if (currentTop >= depth) {
                        filterNodes.push('#' + $(this).attr('id'));
                        lastTop = $(this).position().top;
                    }
                });
                
                if (filterNodes.length) {
                    goTop = base.$nodes.filter(filterNodes.join(', '));
                }
            } else {
                goTop = base.$nodes.filter(base.options.goTopNodes);
            }
            
            top = $('<a href="#" class="' + base.options.goTopClass + '" title="' + text + '">' + text + '</a>');
        };
        
        /*
         * Get node element in which level
         */
        base.getLevel = function(node) {
            var n;

            if (base.nodes.ids.length) {
                n = node.get(0).nodeName.toLowerCase();

                if ($.inArray(n, base.nodes.ids) >= 0) {
                    return base.nodes.sorts.ids[n];
                }
            }

            if (base.nodes.classes.length) {
                for(var i in base.nodes.classes) {
                    n = base.nodes.classes[i];

                    if (node.hasClass(n)) {
                        return base.nodes.sorts.classes[n];
                    }
                }
            }

            return 0;
        };
        
        /*
         * Toc output with tieredList
         */
        base.tieredList = function() {
            var exist = $.inArray(base.options.tocListType, ['ul', 'ol']);
            return exist < 0 ? false : true;
        };
        
        /*
         * Get current obj to go to the top of the height
         */
        base.getPositionToTop = function($obj) {
            var top = 0, end;

            while($obj) {
                end = ($obj.data('isGoTopPosition') && 'yes' === $obj.data('isGoTopPosition')) ? true : false;

                if (!end) {
                    top += $obj.position().top;
                    $obj = $obj.parent();
                } else {
                    $obj = null;
                    break;
                }
            }

            return top;
        };
        
        /*
         * Prepare toc each text with link
         */
        base.formatLink = function(node, level, label) {
            var text = node.text(),
            id = node.attr('id') || base.options.nodeIdPrefix + base.nodeNum,
            style = (base.tiered ? '' : ' class="' + base.options.tocClassPrefix + level + '"');
            
            node.attr('id', id);
            base.nodeNum++;
            
            return label + '<a href="#' + id + '" title="' + text + '"' + style + '>' + text + '</a>';
        };
        
        /*
         * Format tag with levels
         */
        base.formatLevel = function(level, last) {
            if (true !== last) {
                last = false;
            }
            
            var output = (level > base.currentLevel) ? base.formatTag(base.currentLevel, level, !last) : base.formatTag(level, base.currentLevel) + ((true === last) ? base.formatTag(0, base.currentLevel) : base.listEC + base.listEO);
            
            return output;
        };
        
        /*
         * Format tag
         * <ul><li>, </ul><ul>, </li><li>
         */
        base.formatTag = function(start, end, open) {
            var tags = [];

            if (true !== open) {
                open = false;
            }

            for (var i = start; i < end; i++) {
                tags.push(open ? base.listO : base.listC);
            }

            return (open ? tags.join(base.listEO) + base.listEO : base.listEC + tags.join(base.listEC));
        };
        
        // ready go
        base.init();
    };
    
    /*
     * erToc default options
     */
    $.erToc.defaults = {
        startLevel: 'h5', // node name, class or node array subscript [0|1]...n
        maxLevel: 'h6', // node name, class or node array subscript [0|1]...n
        nodes: ['h5', 'h6'], // nodes for prepare toc, support class ['.p1', '.p2', '.p3', '.p4', '.p5', '.p6']
        nodeMin: 0, // min nodes for toc
        nodeMax: 0, // max nodes for toc
        nodeClass: 'er_toc_tag',
        nodeIdPrefix: 'er-toc-id-',
        tocTarget: '', // which element the toc will be append
        tocClass: 'er_toc',
        tocTitle: 'Table of Contents', // title for toc, if set empty string, then title will be hidden
        tocTitleClass: 'er_toc_title',
        tocListType: 'ul', // toc output type, ul, li, others will only include text with link
        tocControl: true, // if have toc title, then can set true to control toc hide or show
        tocClassPrefix: 'er_toc_level_',
        tocScroll: true, // enable toc can be scroll, true or false
        goTop: true, // enable go to top action, true or false
        goTopBaseHeight: 0, //if the top is floating to fixed, then it should reduce the height of the top
        goTopNodes: 'auto', // bind to which nodes, auto, all, and custom elements
        goTopDepth: 450, // if go to top nodes was set auto, then here is the depth for two elements
        goTopClass: 'er_toc_top',
        goTopNode: 'body', // go to top element
        scrollSpeed: 1000, // scroll speed, n seconds, slow, fast
        nodeNumKey: 'erTocNodeNum',
        numbered: false,
        numberedJoin: '.',
        numberedPrefix: '',
        numberedSuffix: ' '
    };

    $.fn.erToc = function(options) {
        return this.each(function(i){
            (new $.erToc(this, options));
        });
    };

})(jQuery);
/*!
 * Glide.js
 * Version: 1.0.6
 * Simple, lightweight and fast jQuery slider
 * Author: @JedrzejChalubek
 * Site: http://jedrzejchalubek.com/
 * Licensed under the MIT license
 */

;(function ($, window, document, undefined) {

  var name = 'glide',
    defaults = {

      // {Int or Bool} False for turning off autoplay
      autoplay: 4000,
      // {Bool} Pause autoplay on mouseover slider
      hoverpause: true,

      // {Bool} Circual play
      circular: true,

      // {Int} Animation time
      animationDuration: 500,
      // {String} Animation easing function
      animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',

      /**
       * {Bool or String} Show/hide/appendTo arrows
       * True for append arrows to slider wrapper
       * False for not appending arrows
       * Id or class name (e.g. '.class-name') for appending to specific HTML markup
       */
      arrows: true,
      // {String} Arrows wrapper class
      arrowsWrapperClass: 'slider-arrows',
      // {String} Main class for both arrows
      arrowMainClass: 'slider-arrow',
      // {String} Right arrow
      arrowRightClass: 'slider-arrow--right',
      // {String} Right arrow text
      arrowRightText: 'next',
      // {String} Left arrow
      arrowLeftClass: 'slider-arrow--left',
      // {String} Left arrow text
      arrowLeftText: 'prev',

      /**
       * {Bool or String} Show/hide/appendTo bullets navigation
       * True for append arrows to slider wrapper
       * False for not appending arrows
       * Id or class name (e.g. '.class-name') for appending to specific HTML markup
       */
      navigation: true,
      // {Bool} Center bullet navigation
      navigationCenter: true,
      // {String} Navigation class
      navigationClass: 'slider-nav',
      // {String} Navigation item class
      navigationItemClass: 'slider-nav__item',
      // {String} Current navigation item class
      navigationCurrentItemClass: 'slider-nav__item--current',

      // {Bool} Slide on left/right keyboard arrows press
      keyboard: true,

      // {Int or Bool} Touch settings
      touchDistance: 60,

      // {Function} Callback before plugin init
      beforeInit: function() {},
      // {Function} Callback after plugin init
      afterInit: function() {},

      // {Function} Callback before slide change
      beforeTransition: function() {},
      // {Function} Callback after slide change
      afterTransition: function() {}

    };

  /**
   * Slider Constructor
   * @param {Object} parent
   * @param {Object} options
   */
  function Glide(parent, options) {

    // Cache this
    var self = this;

    // Extend options
    this.options = $.extend({}, defaults, options);
    // Current slide id
    this.currentSlide = 0;
    // If CSS3 Transition isn't supported switch cssSupport variable to false and use $.animate()
    this.cssSupport = ( !this.css.isSupported("transition") || !this.css.isSupported("transform") ) ? false : true;
    // If circular set offset, two cloned slides
    this.offset = (this.options.circular) ? 2 : 0;

    // Callbacks before plugin init
    this.options.beforeInit.call(this);

    // Sidebar
    this.parent = parent;
    // Initialize
    this.init();
    // Start autoplay
    this.play();

    // Callback after plugin init
    this.options.afterInit.call(this);

    /**
     * API
     * Returning slider methods
     */
    return {

      /**
       * Get current slide number
       * @return {Int}
       */
      current: function() {
        return -(self.currentSlide) + 1;
      },

      /**
       * Reinit
       * Rebuild and recalculate dimensions of slider elements
       */
      reinit: function() {
        self.init();
      },

      /**
       * Start autoplay
       */
      play: function() {
        self.play();
      },

      /**
       * Stop autoplay
       */
      pause: function() {
        self.pause();
      },

      /**
       * Slide one forward
       * @param  {Function} callback
       */
      next: function(callback) {
        self.slide(1, false, callback);
      },

      /**
       * Slide one backward
       * @param  {Function} callback
       */
      prev: function(callback) {
        self.slide(-1, false, callback);
      },

      /**
       * Jump to specifed slide
       * @param  {Int}      distance
       * @param  {Function} callback
       */
      jump: function(distance, callback) {
        self.slide(distance-1, true, callback);
      },

      /**
       * Append navigation to specifet target
       * @param  {Mixed} target
       */
      nav: function(target) {

        /**
         * If navigation wrapper already exist
         * Remove it, protection before doubled navigation
         */
        if (self.navigation.wrapper) self.navigation.wrapper.remove();

        // While target isn't specifed, use slider wrapper
        self.options.navigation = (target) ? target : self.options.navigation;
        // Build
        self.navigation();

      },

      /**
       * Append arrows to specifet target
       * @param  {Mixed} target
       */
      arrows: function(target) {

        /**
         * If arrows wrapper already exist
         * Remove it, protection before doubled arrows
         */
        if (self.arrows.wrapper) self.arrows.wrapper.remove();

        // While target isn't specifed, use slider wrapper
        self.options.arrows = (target) ? target : self.options.arrows;
        // Build
        self.arrows();

      }

    };

  }

  /**
   * Building slider
   */
  Glide.prototype.build = function() {

    /**
     * Attatch bindings
     */
    this.bindings();

    /**
     * There is more than one slide
     */
    if (this.slides.length > 1) {
      /**
       * Circular
       * If circular option is true
       * Append left and right arrow
       */
      if (this.options.circular) this.circular();

      /**
       * Arrows
       * If arrows option is true
       * Append left and right arrow
       */
      if (this.options.arrows) this.arrows();

      /**
       * Navigation
       * If navigation option is true
       * Append navigation item for each slide
       */
      if (this.options.navigation) this.navigation();
    }

    /**
     * Attatch events
     */
    this.events();

  };

  /**
   * Build circular DOM elements
   * Clone first and last slide
   * Set wrapper width with addional slides
   * Move slider wrapper to first slide
   */
  Glide.prototype.circular = function() {

    /**
     * Clone first and last slide
     * and set width for each
     */
    this.firstClone = this.slides.filter(':first-child').clone().width(this.slides.spread);
    this.lastClone = this.slides.filter(':last-child').clone().width(this.slides.spread);

    /**
     * Append clodes slides to slider wrapper at the beginning and end
     * Increase wrapper with with values of addional slides
     * Clear translate and skip cloned last slide at the beginning
     */
    this.wrapper.append(this.firstClone).prepend(this.lastClone).width( this.parent.width() * (this.slides.length+2) )
      .trigger('clearTransition')
        .trigger('setTranslate', [-this.slides.spread]);

  };

  /**
   * Building navigation DOM
   */
  Glide.prototype.navigation = function() {

    this.navigation.items = {};

    // Navigation wrapper
    this.navigation.wrapper = $('<div />', {
      'class': this.options.navigationClass
    }).appendTo(
      /**
       * Setting append target
       * If option is true set default target, that is slider wrapper
       * Else get target set in options
       * @type {Bool or String}
       */
      (this.options.navigation === true) ? this.parent : this.options.navigation
    );

    for (var i = 0; i < this.slides.length; i++) {
      this.navigation.items[i] = $('<a />', {
        'href': '#',
        'class': this.options.navigationItemClass,
        // Direction and distance -> Item index forward
        'data-distance': i
      }).appendTo(this.navigation.wrapper);
    }

    // Add navCurrentItemClass to the first navigation item
    this.navigation.items[0].addClass(this.options.navigationCurrentItemClass);

    // If centered option is true
    if (this.options.navigationCenter) {
      // Center bullet navigation
      this.navigation.wrapper.css({
        'left': '50%',
        'width': this.navigation.wrapper.children().outerWidth(true) * this.navigation.wrapper.children().length,
        'margin-left': -(this.navigation.wrapper.outerWidth(true)/2)
      });
    }

  };

    /**
   * Building arrows DOM
   */
  Glide.prototype.arrows = function() {

    /**
     * Arrows wrapper
     * @type {Obejct}
     */
    this.arrows.wrapper = $('<div />', {
      'class': this.options.arrowsWrapperClass
    }).appendTo(
      /**
       * Setting append target
       * If option is true set default target, that is slider wrapper
       * Else get target set in options
       * @type {Bool or String}
       */
      (this.options.arrows === true) ? this.parent : this.options.arrows
    );

    /**
     * Right arrow
     * @type {Obejct}
     */
    this.arrows.right = $('<a />', {
      'href': '#',
      'class': this.options.arrowMainClass + ' ' + this.options.arrowRightClass,
      // Direction and distance -> One forward
      'data-distance': '1',
      'html': this.options.arrowRightText
    }).appendTo(this.arrows.wrapper);

    /**
     * Left arrow
     * @type {Object}
     */
    this.arrows.left = $('<a />', {
      'href': '#',
      'class': this.options.arrowMainClass + ' ' + this.options.arrowLeftClass,
      // Direction and distance -> One backward
      'data-distance': '-1',
      'html': this.options.arrowLeftText
    }).appendTo(this.arrows.wrapper);

  };

  /**
   * Function bindings
   */
  Glide.prototype.bindings = function() {

    var self = this,
      o = this.options,
      prefix = this.css.getPrefix();

    /**
     * Setup slider wrapper bindings
     * for translate and transition control
     */
    this.wrapper.bind({

      /**
       * Set transition
       */
      'setTransition': function() {
        $(this).css( prefix + 'transition', prefix + 'transform ' + o.animationDuration + 'ms ' + o.animationTimingFunc);
      },

      /**
       * Clear transition
       * for immediate jump effect
       */
      'clearTransition': function() {
        $(this).css( prefix + 'transition', 'none');
      },

      /**
       * Set translate value
       * @param  {Object} event
       * @param  {Ind} translate
       */
      'setTranslate': function(event, translate) {
        // if css3 suported set translate3d
        if (self.cssSupport) $(this).css( prefix + 'transform', 'translate3d(' + translate + 'px, 0px, 0px)');
        // if not set left margin
        else $(this).css('margin-left', translate);
      }

    });

  };

  /**
   * Events controllers
   */
  Glide.prototype.events = function() {

    /**
     * Swipe
     * If swipe option is true
     * Attach touch events
     */
    if (this.options.touchDistance) {
      this.parent.on({
        'touchstart MSPointerDown': $.proxy(this.events.touchstart, this),
        'touchmove MSPointerMove': $.proxy(this.events.touchmove, this),
        'touchend MSPointerUp': $.proxy(this.events.touchend, this),
      });
    }

    /**
     * Arrows
     * If arrows exists
     * Attach click event
     */
    if (this.arrows.wrapper) {
      $(this.arrows.wrapper).children().on('click touchstart',
        $.proxy(this.events.arrows, this)
      );
    }

    /**
     * Navigation
     * If navigation exists
     * Attach click event
     */
    if (this.navigation.wrapper) {
      $(this.navigation.wrapper).children().on('click touchstart',
        $.proxy(this.events.navigation, this)
      );
    }

    /**
     * Keyboard
     * If keyboard option is true
     * Attach press event
     */
    if (this.options.keyboard) {
      $(document).on('keyup.glideKeyup',
        $.proxy(this.events.keyboard, this)
      );
    }

    /**
     * Slider hover
     * If hover option is true
     * Attach hover event
     */
    if (this.options.hoverpause) {
      this.parent.on('mouseover mouseout',
        $.proxy(this.events.hover, this)
      );
    }

    /**
     * Slider resize
     * On window resize
     * Attach resize event
     */
    $(window).on('resize',
      $.proxy(this.events.resize, this)
    );

  };

  /**
   * Navigation event controller
   * On click in navigation item get distance
   * Then slide specified distance with jump
   */
  Glide.prototype.events.navigation = function(event) {

    if ( !this.wrapper.attr('disabled') ) {
      // Prevent default behaviour
      event.preventDefault();
      // Slide distance specified in data attribute
      this.slide( $(event.currentTarget).data('distance'), true );
    }

  };

  /**
   * Arrows event controller
   * On click in arrows get direction and distance
   * Then slide specified distance without jump
   * @param  {Obejct} event
   */
  Glide.prototype.events.arrows = function(event) {

    if ( !this.wrapper.attr('disabled') ) {
      // Prevent default behaviour
      event.preventDefault();
      // Slide distance specified in data attribute
      this.slide( $(event.currentTarget).data('distance'), false );
    }

  };

  /**
   * Keyboard arrows event controller
   * Keyboard left and right arrow keys press
   */
  Glide.prototype.events.keyboard = function(event) {

    if ( !this.wrapper.attr('disabled') ) {
      // Next
      if (event.keyCode === 39) this.slide(1);
      // Prev
      if (event.keyCode === 37) this.slide(-1);
    }

  };

  /**
   * When mouse is over slider, pause autoplay
   * On out, start autoplay again
   */
  Glide.prototype.events.hover = function(event) {

    // Pasue autoplay
    this.pause();

    // When mouse left slider or touch end, start autoplay anew
    if (event.type === 'mouseout') this.play();

  };

  /**
   * When resize browser window
   * Reinit plugin for new slider dimensions
   * Correct crop to current slide
   */
  Glide.prototype.events.resize = function(event) {

    // Reinit plugin (set new slider dimensions)
    this.dimensions();
    // Crop to current slide
    this.slide(0);

  };

  /**
   * Disable events thats controls slide changes
   */
  Glide.prototype.disableEvents = function() {
    this.wrapper.attr( "disabled", true );
  };

  /**
   * Enable events thats controls slide changes
   */
  Glide.prototype.enableEvents = function() {
    this.wrapper.attr( "disabled", false );
  };

  /**
  * Touch start
  * @param  {Object} e event
  */
  Glide.prototype.events.touchstart = function(event) {

    // Cache event
    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    // Get touch start points
    this.events.touchStartX = touch.pageX;
    this.events.touchStartY = touch.pageY;
    this.events.touchSin = null;

  };

  /**
  * Touch move
  * From swipe length segments calculate swipe angle
  * @param  {Obejct} e event
  */
  Glide.prototype.events.touchmove = function(event) {

    // Cache event
    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    // Calculate start, end points
    var subExSx = touch.pageX - this.events.touchStartX;
    var subEySy = touch.pageY - this.events.touchStartY;
    // Bitwise subExSx pow
    var powEX = Math.abs( subExSx << 2 );
    // Bitwise subEySy pow
    var powEY = Math.abs( subEySy << 2 );
    // Calculate the length of the hypotenuse segment
    var touchHypotenuse = Math.sqrt( powEX + powEY );
    // Calculate the length of the cathetus segment
    var touchCathetus = Math.sqrt( powEY );

    // Calculate the sine of the angle
    this.events.touchSin = Math.asin( touchCathetus/touchHypotenuse );

    if ( (this.events.touchSin * (180 / Math.PI)) < 45 ) event.preventDefault();

  };

  /**
  * Touch end
  * @param  {Object} e event
  */
  Glide.prototype.events.touchend = function(event) {

    // Cache event
    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    // Calculate touch distance
    var touchDistance = touch.pageX - this.events.touchStartX;

    // While touch is positive and greater than distance set in options
    if ( (touchDistance > this.options.touchDistance) && ( (this.events.touchSin * (180 / Math.PI)) < 45) ) {
      // Slide one backward
      this.slide(-1);
    // While touch is negative and lower than negative distance set in options
    } else if (
      (touchDistance < -this.options.touchDistance) && ( (this.events.touchSin * (180 / Math.PI)) < 45) ) {
      // Slide one forward
      this.slide(1);
    }

  };

  /**
   * Slides change & animate logic
   * @param  {int} distance
   * @param  {bool} jump
   * @param  {function} callback
   */
  Glide.prototype.slide = function(distance, jump, callback) {

    /**
     * Stop autoplay
     * Clearing timer
     */
    this.pause();

    // Callbacks before slide change
    this.options.beforeTransition.call(this);

    // Setup variables
    var self = this,
      currentSlide = (jump) ? 0 : this.currentSlide,
      slidesLength = -(this.slides.length-1),
      fromFirst = false,
      fromLast = false;

    /**
     * Check if current slide is first and direction is previous, then go to last slide
     * or current slide is last and direction is next, then go to the first slide
     * else change current slide normally
     */
    if ( currentSlide === 0 && distance === -1 ) {
      fromFirst = true;
      currentSlide = slidesLength;
    } else if ( currentSlide === slidesLength && distance === 1 ) {
      fromLast = true;
      currentSlide = 0;
    } else {
      currentSlide = currentSlide + (-distance);
    }

    /**
     * Crop to current slide.
     * Mul slide width by current slide number.
     */
    var offset = this.slides.spread * currentSlide;

    /**
     * While circular decrease offset with the width of single slide
     * When fromFirst and fromLast flags are set, unbind events thats controls changing
     * When fromLast flags is set, set offset to slide width mulled by slides count without cloned slides
     * When fromFirst flags is set, set offset to zero
     */
    if (this.options.circular) {
      offset = offset - this.slides.spread;
      if (fromLast || fromFirst) this.disableEvents();
      if (fromLast) offset = this.slides.spread * (slidesLength - 2);
      if (fromFirst) offset = 0;
    }

    /**
     * Slide change animation
     * While CSS3 is supported use offset
     * if not, use $.animate();
     */
    if (this.cssSupport) this.wrapper.trigger('setTransition').trigger('setTranslate', [offset]);
    else this.wrapper.stop().animate({ 'margin-left': offset }, this.options.animationDuration);

    /**
     * While circular
     */
    if (this.options.circular) {

      /**
       *  When fromFirst and fromLast flags are set
       *  after animation clear transition and bind events that control slides changing
       */
      if (fromFirst || fromLast) {
        this.afterAnimation(function(){
          self.wrapper.trigger('clearTransition');
          self.enableEvents();
        });
      }

      /**
       * When fromLast flag is set
       * after animation make immediate jump from cloned slide to proper one
       */
      if (fromLast) {
        this.afterAnimation(function(){
          fromLast = false;
          self.wrapper.trigger('setTranslate', [-self.slides.spread]);
        });
      }

      /**
       * When fromFirst flag is set
       * after animation make immediate jump from cloned slide to proper one
       */
      if (fromFirst) {
        this.afterAnimation(function(){
          fromFirst = false;
          self.wrapper.trigger('setTranslate', [self.slides.spread * (slidesLength-1)]);
        });
      }

    }

    // Set to navigation item current class
    if (this.options.navigation && this.navigation.wrapper) {
      $(this.parent).children('.' + this.options.navigationClass).children()
        .eq(-currentSlide)
          .addClass(this.options.navigationCurrentItemClass)
            .siblings()
              .removeClass(this.options.navigationCurrentItemClass);
    }

    // Update current slide globaly
    this.currentSlide = currentSlide;

    // Callbacks after slide change
    this.afterAnimation(function(){
      self.options.afterTransition.call(self);
      if ( (callback !== 'undefined') && (typeof callback === 'function') ) callback();
    });

    /**
     * Start autoplay
     * Setting up timer
     */
    this.play();

  };

  /**
   * Autoplay logic
   * Setup counting
   */
  Glide.prototype.play = function() {

    // Cache this
    var self = this;

    /**
     * If autoplay turn on
     * Slide one forward after a set time
     */
    if (this.options.autoplay) {
      this.auto = setInterval(function() {
        self.slide(1, false);
      }, this.options.autoplay);
    }

  };

  /**
   * Autoplay pause
   * Clear counting
   */
  Glide.prototype.pause = function() {

    /**
     * If autoplay turn on
     * Clear interial
     */
    if (this.options.autoplay) this.auto = clearInterval(this.auto);

  };

  /**
   * Call callback after animation duration
   * Added 10 ms to duration to be sure is fired after animation
   * @param  {Function} callback
   */
  Glide.prototype.afterAnimation = function(callback) {

    setTimeout(function(){
      callback();
    }, this.options.animationDuration + 10);

  };

  /**
   * Dimensions
   * Get & set dimensions of slider elements
   */
  Glide.prototype.dimensions = function() {

    // Get slide width
    this.slides.spread = this.parent.width();
    // Set wrapper width
    this.wrapper.width(this.slides.spread * (this.slides.length + this.offset));
    // Set slide width
    this.slides.add(this.firstClone).add(this.lastClone).width(this.slides.spread);

  };

  /**
   * Initialize
   * Set wrapper
   * Set slides
   * Set animation type
   */
  Glide.prototype.init = function() {

    // Set slides wrapper
    this.wrapper = this.parent.children();
    // Set slides
    this.slides = this.wrapper.children();
    // Set slider dimentions
    this.dimensions();

    // Build DOM
    this.build();

  };


  /**
   * Methods for css3 management
   */
  Glide.prototype.css = {

    /**
     * Check css3 support
     * @param  {String}  Declaration name to check
     * @return {Boolean}
     */
    isSupported: function(declaration) {

      var isSupported = false,
        prefixes = 'Khtml ms O Moz Webkit'.split(' '),
        clone = document.createElement('div'),
        declarationCapital = null;

      declaration = declaration.toLowerCase();
      if (clone.style[declaration] !== undefined) isSupported = true;
      if (isSupported === false) {
        declarationCapital = declaration.charAt(0).toUpperCase() + declaration.substr(1);
        for( var i = 0; i < prefixes.length; i++ ) {
          if( clone.style[prefixes[i] + declarationCapital ] !== undefined ) {
            isSupported = true;
            break;
          }
        }
      }

      if (window.opera) {
        if (window.opera.version() < 13) isSupported = false;
      }

      if (isSupported === 'undefined' || isSupported === undefined) isSupported = false;

      return isSupported;

    },

    /**
     * Get browser css prefix
     * @return {String}   Returns prefix in "-{prefix}-" format
     */
    getPrefix: function () {

      if (!window.getComputedStyle) return '';

      var styles = window.getComputedStyle(document.documentElement, '');
      return '-' + (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1] + '-';

    }

  };

  $.fn[name] = function(options) {

    return this.each(function () {
      if ( !$.data(this, 'api_' + name) ) {
        $.data(this, 'api_' + name,
          new Glide($(this), options)
        );
      }
    });

  };

})(jQuery, window, document);
(function() {
  var refillsMenuAnchor = $('.refills-menu-anchor');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      refillsMenuAnchor.addClass('refills-menu-anchor-moved');
    } else if ($(this).scrollTop() <= 50) {
      refillsMenuAnchor.removeClass('refills-menu-anchor-moved');
    }
  });
})();
/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2013 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v1.2.3
*/

!function(){"use strict";var a,b=function(){var a=/\-([a-z])/g,b=function(a,b){return b.toUpperCase()};return function(c){return c.replace(a,b)}}(),c=function(a,c){var d,e,f,g,h,i;if(window.getComputedStyle?d=window.getComputedStyle(a,null).getPropertyValue(c):(e=b(c),d=a.currentStyle?a.currentStyle[e]:a.style[e]),"cursor"===c&&(!d||"auto"===d))for(f=a.tagName.toLowerCase(),g=["a"],h=0,i=g.length;i>h;h++)if(f===g[h])return"pointer";return d},d=function(a){if(p.prototype._singleton){a||(a=window.event);var b;this!==window?b=this:a.target?b=a.target:a.srcElement&&(b=a.srcElement),p.prototype._singleton.setCurrent(b)}},e=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)},f=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},g=function(a,b){if(a.addClass)return a.addClass(b),a;if(b&&"string"==typeof b){var c=(b||"").split(/\s+/);if(1===a.nodeType)if(a.className){for(var d=" "+a.className+" ",e=a.className,f=0,g=c.length;g>f;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}else a.className=b}return a},h=function(a,b){if(a.removeClass)return a.removeClass(b),a;if(b&&"string"==typeof b||void 0===b){var c=(b||"").split(/\s+/);if(1===a.nodeType&&a.className)if(b){for(var d=(" "+a.className+" ").replace(/[\n\t]/g," "),e=0,f=c.length;f>e;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}else a.className=""}return a},i=function(){var a,b,c,d=1;return"function"==typeof document.body.getBoundingClientRect&&(a=document.body.getBoundingClientRect(),b=a.right-a.left,c=document.body.offsetWidth,d=Math.round(100*(b/c))/100),d},j=function(a){var b={left:0,top:0,width:0,height:0,zIndex:999999999},d=c(a,"z-index");if(d&&"auto"!==d&&(b.zIndex=parseInt(d,10)),a.getBoundingClientRect){var e,f,g,h=a.getBoundingClientRect();"pageXOffset"in window&&"pageYOffset"in window?(e=window.pageXOffset,f=window.pageYOffset):(g=i(),e=Math.round(document.documentElement.scrollLeft/g),f=Math.round(document.documentElement.scrollTop/g));var j=document.documentElement.clientLeft||0,k=document.documentElement.clientTop||0;b.left=h.left+e-j,b.top=h.top+f-k,b.width="width"in h?h.width:h.right-h.left,b.height="height"in h?h.height:h.bottom-h.top}return b},k=function(a,b){var c=!(b&&b.useNoCache===!1);return c?(-1===a.indexOf("?")?"?":"&")+"nocache="+(new Date).getTime():""},l=function(a){var b=[],c=[];return a.trustedOrigins&&("string"==typeof a.trustedOrigins?c.push(a.trustedOrigins):"object"==typeof a.trustedOrigins&&"length"in a.trustedOrigins&&(c=c.concat(a.trustedOrigins))),a.trustedDomains&&("string"==typeof a.trustedDomains?c.push(a.trustedDomains):"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(c=c.concat(a.trustedDomains))),c.length&&b.push("trustedOrigins="+encodeURIComponent(c.join(","))),"string"==typeof a.amdModuleId&&a.amdModuleId&&b.push("amdModuleId="+encodeURIComponent(a.amdModuleId)),"string"==typeof a.cjsModuleId&&a.cjsModuleId&&b.push("cjsModuleId="+encodeURIComponent(a.cjsModuleId)),b.join("&")},m=function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1},n=function(a){if("string"==typeof a)throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},o=function(a,b,c,d,e){e?window.setTimeout(function(){a.call(b,c,d)},0):a.call(b,c,d)},p=function(a,b){if(a&&(p.prototype._singleton||this).glue(a),p.prototype._singleton)return p.prototype._singleton;p.prototype._singleton=this,this.options={};for(var c in s)this.options[c]=s[c];for(var d in b)this.options[d]=b[d];this.handlers={},p.detectFlashSupport()&&v()},q=[];p.prototype.setCurrent=function(b){a=b,this.reposition();var d=b.getAttribute("title");d&&this.setTitle(d);var e=this.options.forceHandCursor===!0||"pointer"===c(b,"cursor");return r.call(this,e),this},p.prototype.setText=function(a){return a&&""!==a&&(this.options.text=a,this.ready()&&this.flashBridge.setText(a)),this},p.prototype.setTitle=function(a){return a&&""!==a&&this.htmlBridge.setAttribute("title",a),this},p.prototype.setSize=function(a,b){return this.ready()&&this.flashBridge.setSize(a,b),this},p.prototype.setHandCursor=function(a){return a="boolean"==typeof a?a:!!a,r.call(this,a),this.options.forceHandCursor=a,this};var r=function(a){this.ready()&&this.flashBridge.setHandCursor(a)};p.version="1.2.3";var s={moviePath:"ZeroClipboard.swf",trustedOrigins:null,text:null,hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",allowScriptAccess:"sameDomain",useNoCache:!0,forceHandCursor:!1};p.setDefaults=function(a){for(var b in a)s[b]=a[b]},p.destroy=function(){p.prototype._singleton.unglue(q);var a=p.prototype._singleton.htmlBridge;a.parentNode.removeChild(a),delete p.prototype._singleton},p.detectFlashSupport=function(){var a=!1;if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=!0)}catch(b){}return!a&&navigator.mimeTypes["application/x-shockwave-flash"]&&(a=!0),a};var t=null,u=null,v=function(){var a,b,c=p.prototype._singleton,d=document.getElementById("global-zeroclipboard-html-bridge");if(!d){var e={};for(var f in c.options)e[f]=c.options[f];e.amdModuleId=t,e.cjsModuleId=u;var g=l(e),h='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+c.options.moviePath+k(c.options.moviePath,c.options)+'"/>         <param name="allowScriptAccess" value="'+c.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+g+'"/>         <embed src="'+c.options.moviePath+k(c.options.moviePath,c.options)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+g+'"           scale="exactfit">         </embed>       </object>';d=document.createElement("div"),d.id="global-zeroclipboard-html-bridge",d.setAttribute("class","global-zeroclipboard-container"),d.setAttribute("data-clipboard-ready",!1),d.style.position="absolute",d.style.left="-9999px",d.style.top="-9999px",d.style.width="15px",d.style.height="15px",d.style.zIndex="9999",d.innerHTML=h,document.body.appendChild(d)}c.htmlBridge=d,a=document["global-zeroclipboard-flash-bridge"],a&&(b=a.length)&&(a=a[b-1]),c.flashBridge=a||d.children[0].lastElementChild};p.prototype.resetBridge=function(){return this.htmlBridge.style.left="-9999px",this.htmlBridge.style.top="-9999px",this.htmlBridge.removeAttribute("title"),this.htmlBridge.removeAttribute("data-clipboard-text"),h(a,this.options.activeClass),a=null,this.options.text=null,this},p.prototype.ready=function(){var a=this.htmlBridge.getAttribute("data-clipboard-ready");return"true"===a||a===!0},p.prototype.reposition=function(){if(!a)return!1;var b=j(a);return this.htmlBridge.style.top=b.top+"px",this.htmlBridge.style.left=b.left+"px",this.htmlBridge.style.width=b.width+"px",this.htmlBridge.style.height=b.height+"px",this.htmlBridge.style.zIndex=b.zIndex+1,this.setSize(b.width,b.height),this},p.dispatch=function(a,b){p.prototype._singleton.receiveEvent(a,b)},p.prototype.on=function(a,b){for(var c=a.toString().split(/\s/g),d=0;d<c.length;d++)a=c[d].toLowerCase().replace(/^on/,""),this.handlers[a]||(this.handlers[a]=b);return this.handlers.noflash&&!p.detectFlashSupport()&&this.receiveEvent("onNoFlash",null),this},p.prototype.addEventListener=p.prototype.on,p.prototype.off=function(a,b){for(var c=a.toString().split(/\s/g),d=0;d<c.length;d++){a=c[d].toLowerCase().replace(/^on/,"");for(var e in this.handlers)e===a&&this.handlers[e]===b&&delete this.handlers[e]}return this},p.prototype.removeEventListener=p.prototype.off,p.prototype.receiveEvent=function(b,c){b=b.toString().toLowerCase().replace(/^on/,"");var d=a,e=!0;switch(b){case"load":if(c&&parseFloat(c.flashVersion.replace(",",".").replace(/[^0-9\.]/gi,""))<10)return this.receiveEvent("onWrongFlash",{flashVersion:c.flashVersion}),void 0;this.htmlBridge.setAttribute("data-clipboard-ready",!0);break;case"mouseover":g(d,this.options.hoverClass);break;case"mouseout":h(d,this.options.hoverClass),this.resetBridge();break;case"mousedown":g(d,this.options.activeClass);break;case"mouseup":h(d,this.options.activeClass);break;case"datarequested":var f=d.getAttribute("data-clipboard-target"),i=f?document.getElementById(f):null;if(i){var j=i.value||i.textContent||i.innerText;j&&this.setText(j)}else{var k=d.getAttribute("data-clipboard-text");k&&this.setText(k)}e=!1;break;case"complete":this.options.text=null}if(this.handlers[b]){var l=this.handlers[b];"string"==typeof l&&"function"==typeof window[l]&&(l=window[l]),"function"==typeof l&&o(l,d,this,c,e)}},p.prototype.glue=function(a){a=n(a);for(var b=0;b<a.length;b++)-1==m(a[b],q)&&(q.push(a[b]),e(a[b],"mouseover",d));return this},p.prototype.unglue=function(a){a=n(a);for(var b=0;b<a.length;b++){f(a[b],"mouseover",d);var c=m(a[b],q);-1!=c&&q.splice(c,1)}return this},"function"==typeof define&&define.amd?define(["require","exports","module"],function(a,b,c){return t=c&&c.id||null,p}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?(u=module.id||null,module.exports=p):window.ZeroClipboard=p}();
;(function( win, $ ) {

	function featureTest( property, value, noPrefixes ) {
		// Thanks Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
		var prop = property + ':',
			el = document.createElement( 'test' ),
			mStyle = el.style;

		if( !noPrefixes ) {
			mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
		} else {
			mStyle.cssText = prop + value;
		}
		return mStyle[ property ].indexOf( value ) !== -1;
	}

	function getPx( unit ) {
		return parseInt( unit, 10 ) || 0;
	}

	var S = {
		classes: {
			plugin: 'fixedsticky',
			active: 'fixedsticky-on',
			inactive: 'fixedsticky-off',
			clone: 'fixedsticky-dummy',
			withoutFixedFixed: 'fixedsticky-withoutfixedfixed'
		},
		keys: {
			offset: 'fixedStickyOffset',
			position: 'fixedStickyPosition'
		},
		tests: {
			sticky: featureTest( 'position', 'sticky' ),
			fixed: featureTest( 'position', 'fixed', true )
		},
		// Thanks jQuery!
		getScrollTop: function() {
			var prop = 'pageYOffset',
				method = 'scrollTop';
			return win ? (prop in win) ? win[ prop ] :
				win.document.documentElement[ method ] :
				win.document.body[ method ];
		},
		bypass: function() {
			// Check native sticky, check fixed and if fixed-fixed is also included on the page and is supported
			return ( S.tests.sticky && !S.optOut ) ||
				!S.tests.fixed ||
				win.FixedFixed && !$( win.document.documentElement ).hasClass( 'fixed-supported' );
		},
		update: function( el ) {
			if( !el.offsetWidth ) { return; }

			var $el = $( el ),
				height = $el.outerHeight(),
				initialOffset = $el.data( S.keys.offset ),
				scroll = S.getScrollTop(),
				isAlreadyOn = $el.is( '.' + S.classes.active ),
				toggle = function( turnOn ) {
					$el[ turnOn ? 'addClass' : 'removeClass' ]( S.classes.active )
						[ !turnOn ? 'addClass' : 'removeClass' ]( S.classes.inactive );
				},
				viewportHeight = $( window ).height(),
				position = $el.data( S.keys.position ),
				skipSettingToFixed,
				elTop,
				elBottom,
				$parent = $el.parent(),
				parentOffset = $parent.offset().top,
				parentHeight = $parent.outerHeight();

			if( initialOffset === undefined ) {
				initialOffset = $el.offset().top;
				$el.data( S.keys.offset, initialOffset );
				$el.after( $( '<div>' ).addClass( S.classes.clone ).height( height ) );
			}

			if( !position ) {
				// Some browsers require fixed/absolute to report accurate top/left values.
				skipSettingToFixed = $el.css( 'top' ) !== 'auto' || $el.css( 'bottom' ) !== 'auto';

				if( !skipSettingToFixed ) {
					$el.css( 'position', 'fixed' );
				}

				position = {
					top: $el.css( 'top' ) !== 'auto',
					bottom: $el.css( 'bottom' ) !== 'auto'
				};

				if( !skipSettingToFixed ) {
					$el.css( 'position', '' );
				}

				$el.data( S.keys.position, position );
			}

			function isFixedToTop() {
				var offsetTop = scroll + elTop;

				// Initial Offset Top
				return initialOffset < offsetTop &&
					// Container Bottom
					offsetTop + height <= parentOffset + parentHeight;
			}

			function isFixedToBottom() {
				// Initial Offset Top + Height
				return initialOffset + ( height || 0 ) > scroll + viewportHeight - elBottom &&
					// Container Top
					scroll + viewportHeight - elBottom >= parentOffset + ( height || 0 );
			}

			elTop = getPx( $el.css( 'top' ) );
			elBottom = getPx( $el.css( 'bottom' ) );

			if( position.top && isFixedToTop() || position.bottom && isFixedToBottom() ) {
				if( !isAlreadyOn ) {
					toggle( true );
				}
			} else {
				if( isAlreadyOn ) {
					toggle( false );
				}
			}
		},
		destroy: function( el ) {
			var $el = $( el );
			if (S.bypass()) {
				return;
			}

			$( win ).unbind( '.fixedsticky' );

			return $el.each(function() {
				$( this )
					.removeData( [ S.keys.offset, S.keys.position ] )
					.removeClass( S.classes.active )
					.removeClass( S.classes.inactive )
					.next( '.' + S.classes.clone ).remove();
			});
		},
		init: function( el ) {
			var $el = $( el );

			if( S.bypass() ) {
				return;
			}

			return $el.each(function() {
				var _this = this;
				$( win ).bind( 'scroll.fixedsticky', function() {
					S.update( _this );
				});

				S.update( this );

				$( win ).bind( 'resize.fixedsticky', function() {
					if( $el.is( '.' + S.classes.active ) ) {
						S.update( _this );
					}
				});
			});
		}
	};

	win.FixedSticky = S;

	// Plugin
	$.fn.fixedsticky = function( method ) {
		if ( typeof S[ method ] === 'function') {
			return S[ method ].call( S, this);
		} else if ( typeof method === 'object' || ! method ) {
			return S.init.call( S, this );
		} else {
			throw new Error( 'Method `' +  method + '` does not exist on jQuery.fixedsticky' );
		}
	};

	// Add fallback when fixed-fixed is not available.
	if( !win.FixedFixed ) {
		$( win.document.documentElement ).addClass( S.classes.withoutFixedFixed );
	}

})( this, jQuery );
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */
(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar,l.language);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r,i){return n.stringify(t.tokenize(e,r),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u],f=a.inside,l=!!a.lookbehind,c=0;a=a.pattern||a;for(var h=0;h<s.length;h++){var p=s[h];if(s.length>e.length)break e;if(p instanceof i)continue;a.lastIndex=0;var d=a.exec(p);if(d){l&&(c=d[1].length);var v=d.index-1+c,d=d[0].slice(c),m=d.length,g=v+m,y=p.slice(0,v+1),b=p.slice(g+1),w=[h,1];y&&w.push(y);var E=new i(u,f?t.tokenize(d,f):d);w.push(E);b&&w.push(b);Array.prototype.splice.apply(s,w)}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true");t.hooks.run("wrap",s);var o="";for(var u in s.attributes)o+=u+'="'+(s.attributes[u]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+o+">"+s.content+"</"+s.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();;
Prism.languages.markup={comment:/&lt;!--[\w\W]*?-->/g,prolog:/&lt;\?.+?\?>/,doctype:/&lt;!DOCTYPE.+?>/,cdata:/&lt;!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(e){e.type==="entity"&&(e.attributes.title=e.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/ig,inside:{punctuation:/\(/}}, number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};
;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g});Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}});Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});
;
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&amp;|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm});Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return)|(?=@for\s+\$[-_\w]+\s)+from/i});Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i});Prism.languages.insertBefore("scss","ignore",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g});
;
/* =============================================================

	Smooth Scroll 2.9
	Animate scrolling to anchor links, by Chris Ferdinandi.
	http://gomakethings.com

	Easing support contributed by Willem Liu.
	https://github.com/willemliu

	Easing functions forked from Gaëtan Renaudeau.
	https://gist.github.com/gre/1650294

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */


(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to animate the scroll
		var smoothScroll = function (anchor, duration, easing) {

			// Functions to control easing
			var easingPattern = function (type, time) {
				if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
				if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
				if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
				if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
				if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
				if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
				if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
				if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
				if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
				if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
				if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
				if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
				return time; // no easing, no acceleration
			};

			// Calculate how far and how fast to scroll
			// http://www.quirksmode.org/blog/archives/2008/01/using_the_assig.html
			var startLocation = window.pageYOffset;
			var endLocation = function (anchor) {
				var distance = 0;
				if (anchor.offsetParent) {
					do {
						distance += anchor.offsetTop;
						anchor = anchor.offsetParent;
					} while (anchor);
				}
				return distance;
			};
			var distance = endLocation(anchor) - startLocation;
			var increments = distance / (duration / 16);
			var timeLapsed = 0;
			var percentage, position, stopAnimation;

			// Scroll the page by an increment, and check if it's time to stop
			var animateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / duration );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * easingPattern(easing, percentage) );
				window.scrollTo(0, position);
				stopAnimation();
			};

			// Stop the animation
			if ( increments >= 0 ) { // If scrolling down
				// Stop animation when you reach the anchor OR the bottom of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( (travelled >= (endLocation(anchor) - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
						clearInterval(runAnimation);
					}
				};
			} else { // If scrolling up
				// Stop animation when you reach the anchor OR the top of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( travelled <= endLocation(anchor) || travelled <= 0 ) {
						clearInterval(runAnimation);
					}
				};
			}

			// Loop the animation function
			var runAnimation = setInterval(animateScroll, 16);

		};

		// For each smooth scroll link
		var scrollToggle = document.querySelectorAll('.scroll');
		[].forEach.call(scrollToggle, function (toggle) {

			// When the smooth scroll link is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent the default link behavior
				e.preventDefault();

				// Get anchor link and calculate distance from the top
				var dataID = toggle.getAttribute('href');
				var dataTarget = document.querySelector(dataID);
				var dataSpeed = toggle.getAttribute('data-speed');
				var dataEasing = toggle.getAttribute('data-easing'); // WL: Added easing attribute support.

				// If the anchor exists
				if (dataTarget) {
					// Scroll to the anchor
					smoothScroll(dataTarget, dataSpeed || 500, dataEasing || 'easeInOutCubic');
				}

			}, false);

		});

	}

})();
$('.js-accordion-trigger').bind('click', function(e){
  jQuery(this).parent().find('.submenu').slideToggle('fast');  // apply the toggle to the ul
  jQuery(this).parent().toggleClass('is-expanded');
  e.preventDefault();
});
$('.accordion-base-trigger').bind('click', function(e){
  jQuery(this).parent().find('.submenu').slideToggle('fast');  // apply the toggle to the ul
  jQuery(this).parent().toggleClass('is-expanded');
  e.preventDefault();
});
$(document).ready(function () {
  $('.accordion-tabs').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});
$(document).ready(function () {
  $('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});
$(function() {
  var animationClasses = 'animated alternate iteration zoomOut';
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  $('.animate-trigger').on('click',function() {
    $('.animate-target').addClass(animationClasses).one(animationEnd,function() {
      $(this).removeClass(animationClasses);
    });
  });
});
$('.base-accordion-trigger').bind('click', function(e){
  jQuery(this).parent().find('.submenu').slideToggle('fast');
  jQuery(this).parent().toggleClass('is-expanded');
  e.preventDefault();
});
$(window).on("load resize",function(e) {
  var more = document.getElementById("js-centered-more");

  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#js-centered-more .submenu .submenu").removeClass("fly-out-right");
      $("#js-centered-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#js-centered-more .submenu .submenu").removeClass("fly-out-left");
      $("#js-centered-more .submenu .submenu").addClass("fly-out-right");
    }
  }

  var menuToggle = $("#js-centered-navigation-mobile-menu").unbind();
  $("#js-centered-navigation-menu").removeClass("show");

  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-centered-navigation-menu").slideToggle(function(){
      if($("#js-centered-navigation-menu").is(":hidden")) {
        $("#js-centered-navigation-menu").removeAttr("style");
      }
    });
  });
}); 
$(document).ready(function() {
  $(".dropdown-button").click(function() {
    var $button, $menu;
    $button = $(this);
    $menu = $button.siblings(".dropdown-menu");
    $menu.toggleClass("show-menu");
    $menu.children("li").click(function() {
      $menu.removeClass("show-menu");
      $button.html($(this).html());
    });
  });
});
$(document).ready(function() {
  $('.expander-trigger').click(function(){
    $(this).toggleClass("expander-hidden");
  });
});
$(document).ready(function() {
  var element = document.getElementById("js-fadeInElement");
  $(element).addClass('js-fade-element-hide');

  $(window).scroll(function() {
    if( $("#js-fadeInElement").length > 0 ) {
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('js-fade-element-show');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('js-fade-element-show');
        $(element).addClass('js-fade-element-hide');
      }
    }
  });
});
$(function() {
  $("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-fade-screen, .modal-close").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });
});
$(window).resize(function() {
  var more = document.getElementById("js-navigation-more");
  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
    }
  }
});

$(document).ready(function() {
  var menuToggle = $("#js-mobile-menu").unbind();
  $("#js-navigation-menu").removeClass("show");

  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
  });
}); 
$(document).ready(function() {
  var menuToggle = $("#js-navigation-centered-mobile-menu").unbind();
  $("#js-navigation-centered-menu").removeClass("show");
  
  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-centered-menu").slideToggle(function(){
      if($("#js-navigation-centered-menu").is(":hidden")) {
        $("#js-navigation-centered-menu").removeAttr("style");
      }
    });
  });
});
$(document).ready(function() {
  if ($("#js-parallax-window").length) {
    parallax();
  }
});

$(window).scroll(function(e) {
  if ($("#js-parallax-window").length) {
    parallax();
  }
});

function parallax(){
  if( $("#js-parallax-window").length > 0 ) {
    var plxBackground = $("#js-parallax-background");
    var plxWindow = $("#js-parallax-window");

    var plxWindowTopToPageTop = $(plxWindow).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

    var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
    var windowInnerHeight = window.innerHeight;
    var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
    var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
    var plxSpeed = 0.35;

    plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
  }
}
;
(function (jQuery) {
  jQuery.mark = {
    jump: function (options) {
      var defaults = {
        selector: 'a.scroll-on-page-link'
      };
      if (typeof options == 'string') {
        defaults.selector = options;
      }

      options = jQuery.extend(defaults, options);
      return jQuery(options.selector).click(function (e) {
        var jumpobj = jQuery(this);
        var target = jumpobj.attr('href');
        var thespeed = 1000;
        var offset = jQuery(target).offset().top;
        jQuery('html,body').animate({
          scrollTop: offset
        }, thespeed, 'swing');
        e.preventDefault();
      });
    }
  };
})(jQuery);


jQuery(function(){  
  jQuery.mark.jump();
});
var Filter = (function() {
  function Filter(element) {
    this._element = $(element);
    this._optionsContainer = this._element.find(this.constructor.optionsContainerSelector);
  }

  Filter.selector = '.filter';
  Filter.optionsContainerSelector = '> div';
  Filter.hideOptionsClass = 'hide-options';

  Filter.enhance = function() {
    var klass = this;

    return $(klass.selector).each(function() {
      return new klass(this).enhance();
    });
  };

  Filter.prototype.enhance = function() {
    this._buildUI();
    this._bindEvents();
  };

  Filter.prototype._buildUI = function() {
    this._summaryElement = $('<label></label>').
      addClass('summary').
      attr('data-role', 'summary').
      prependTo(this._optionsContainer);

    this._clearSelectionButton = $('<button class=clear></button>').
      text('Clear').
      attr('type', 'button').
      insertAfter(this._summaryElement);

    this._optionsContainer.addClass(this.constructor.hideOptionsClass);
    this._updateSummary();
  };

  Filter.prototype._bindEvents = function() {
    var self = this;

    this._summaryElement.click(function() {
      self._toggleOptions();
    });

    this._clearSelectionButton.click(function() {
      self._clearSelection();
    });

    this._checkboxes().change(function() {
      self._updateSummary();
    });

    $('body').click(function(e) {
      var inFilter = $(e.target).closest(self.constructor.selector).length > 0;

      if (!inFilter) {
        self._allOptionsContainers().addClass(self.constructor.hideOptionsClass);
      }
    });
  };

  Filter.prototype._toggleOptions = function() {
    this._allOptionsContainers().
      not(this._optionsContainer).
      addClass(this.constructor.hideOptionsClass);

    this._optionsContainer.toggleClass(this.constructor.hideOptionsClass);
  };

  Filter.prototype._updateSummary = function() {
    var summary = 'All';
    var checked = this._checkboxes().filter(':checked');

    if (checked.length > 0 && checked.length < this._checkboxes().length) {
      summary = this._labelsFor(checked).join(', ');
    }

    this._summaryElement.text(summary);
  };

  Filter.prototype._clearSelection = function() {
    this._checkboxes().each(function() {
      $(this).prop('checked', false);
    });

    this._updateSummary();
  };

  Filter.prototype._checkboxes = function() {
    return this._element.find(':checkbox');
  };

  Filter.prototype._labelsFor = function(inputs) {
    return inputs.map(function() {
      var id = $(this).attr('id');
      return $("label[for='" + id + "']").text();
    }).get();
  };

  Filter.prototype._allOptionsContainers = function() {
    return $(this.constructor.selector + " " + this.constructor.optionsContainerSelector);
  };

  return Filter;
})();

$(function() {
  Filter.enhance();
});
$(document).ready(function(){
  $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
    e.preventDefault();
  });
});
$(".js-vertical-tab-content").hide();
$(".js-vertical-tab-content:first").show();

/* if in tab mode */
$(".js-vertical-tab").click(function(event) {
  event.preventDefault();

  $(".js-vertical-tab-content").hide();
  var activeTab = $(this).attr("rel");
  $("#"+activeTab).show();

  $(".js-vertical-tab").removeClass("is-active");
  $(this).addClass("is-active");

  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
  $(".js-vertical-tab-accordion-heading[rel^='"+activeTab+"']").addClass("is-active");
});

/* if in accordion mode */
$(".js-vertical-tab-accordion-heading").click(function(event) {
  event.preventDefault();

  $(".js-vertical-tab-content").hide();
  var accordion_activeTab = $(this).attr("rel");
  $("#"+accordion_activeTab).show();

  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
  $(this).addClass("is-active");

  $(".js-vertical-tab").removeClass("is-active");
  $(".js-vertical-tab[rel^='"+accordion_activeTab+"']").addClass("is-active");
});






$(document).ready(function() {
  $('#example').erToc({'goTopNode':'#example', 'startLevel': 'h2', 'numberedSuffix':'. '});
  $('.refills-menu-anchor').fixedsticky();
});

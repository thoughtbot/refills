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
            goTop.append(top);
            goTop.children('a.' + base.options.goTopClass).click(function() {
                base.$body.animate({scrollTop: (base.$topNode.offset().top - base.options.goTopBaseHeight)}, base.options.scrollSpeed);
                return false;
            });
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
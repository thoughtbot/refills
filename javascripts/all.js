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
/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2013 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v1.2.3
*/

!function(){"use strict";var a,b=function(){var a=/\-([a-z])/g,b=function(a,b){return b.toUpperCase()};return function(c){return c.replace(a,b)}}(),c=function(a,c){var d,e,f,g,h,i;if(window.getComputedStyle?d=window.getComputedStyle(a,null).getPropertyValue(c):(e=b(c),d=a.currentStyle?a.currentStyle[e]:a.style[e]),"cursor"===c&&(!d||"auto"===d))for(f=a.tagName.toLowerCase(),g=["a"],h=0,i=g.length;i>h;h++)if(f===g[h])return"pointer";return d},d=function(a){if(p.prototype._singleton){a||(a=window.event);var b;this!==window?b=this:a.target?b=a.target:a.srcElement&&(b=a.srcElement),p.prototype._singleton.setCurrent(b)}},e=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)},f=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},g=function(a,b){if(a.addClass)return a.addClass(b),a;if(b&&"string"==typeof b){var c=(b||"").split(/\s+/);if(1===a.nodeType)if(a.className){for(var d=" "+a.className+" ",e=a.className,f=0,g=c.length;g>f;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}else a.className=b}return a},h=function(a,b){if(a.removeClass)return a.removeClass(b),a;if(b&&"string"==typeof b||void 0===b){var c=(b||"").split(/\s+/);if(1===a.nodeType&&a.className)if(b){for(var d=(" "+a.className+" ").replace(/[\n\t]/g," "),e=0,f=c.length;f>e;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}else a.className=""}return a},i=function(){var a,b,c,d=1;return"function"==typeof document.body.getBoundingClientRect&&(a=document.body.getBoundingClientRect(),b=a.right-a.left,c=document.body.offsetWidth,d=Math.round(100*(b/c))/100),d},j=function(a){var b={left:0,top:0,width:0,height:0,zIndex:999999999},d=c(a,"z-index");if(d&&"auto"!==d&&(b.zIndex=parseInt(d,10)),a.getBoundingClientRect){var e,f,g,h=a.getBoundingClientRect();"pageXOffset"in window&&"pageYOffset"in window?(e=window.pageXOffset,f=window.pageYOffset):(g=i(),e=Math.round(document.documentElement.scrollLeft/g),f=Math.round(document.documentElement.scrollTop/g));var j=document.documentElement.clientLeft||0,k=document.documentElement.clientTop||0;b.left=h.left+e-j,b.top=h.top+f-k,b.width="width"in h?h.width:h.right-h.left,b.height="height"in h?h.height:h.bottom-h.top}return b},k=function(a,b){var c=!(b&&b.useNoCache===!1);return c?(-1===a.indexOf("?")?"?":"&")+"nocache="+(new Date).getTime():""},l=function(a){var b=[],c=[];return a.trustedOrigins&&("string"==typeof a.trustedOrigins?c.push(a.trustedOrigins):"object"==typeof a.trustedOrigins&&"length"in a.trustedOrigins&&(c=c.concat(a.trustedOrigins))),a.trustedDomains&&("string"==typeof a.trustedDomains?c.push(a.trustedDomains):"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(c=c.concat(a.trustedDomains))),c.length&&b.push("trustedOrigins="+encodeURIComponent(c.join(","))),"string"==typeof a.amdModuleId&&a.amdModuleId&&b.push("amdModuleId="+encodeURIComponent(a.amdModuleId)),"string"==typeof a.cjsModuleId&&a.cjsModuleId&&b.push("cjsModuleId="+encodeURIComponent(a.cjsModuleId)),b.join("&")},m=function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1},n=function(a){if("string"==typeof a)throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},o=function(a,b,c,d,e){e?window.setTimeout(function(){a.call(b,c,d)},0):a.call(b,c,d)},p=function(a,b){if(a&&(p.prototype._singleton||this).glue(a),p.prototype._singleton)return p.prototype._singleton;p.prototype._singleton=this,this.options={};for(var c in s)this.options[c]=s[c];for(var d in b)this.options[d]=b[d];this.handlers={},p.detectFlashSupport()&&v()},q=[];p.prototype.setCurrent=function(b){a=b,this.reposition();var d=b.getAttribute("title");d&&this.setTitle(d);var e=this.options.forceHandCursor===!0||"pointer"===c(b,"cursor");return r.call(this,e),this},p.prototype.setText=function(a){return a&&""!==a&&(this.options.text=a,this.ready()&&this.flashBridge.setText(a)),this},p.prototype.setTitle=function(a){return a&&""!==a&&this.htmlBridge.setAttribute("title",a),this},p.prototype.setSize=function(a,b){return this.ready()&&this.flashBridge.setSize(a,b),this},p.prototype.setHandCursor=function(a){return a="boolean"==typeof a?a:!!a,r.call(this,a),this.options.forceHandCursor=a,this};var r=function(a){this.ready()&&this.flashBridge.setHandCursor(a)};p.version="1.2.3";var s={moviePath:"ZeroClipboard.swf",trustedOrigins:null,text:null,hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",allowScriptAccess:"sameDomain",useNoCache:!0,forceHandCursor:!1};p.setDefaults=function(a){for(var b in a)s[b]=a[b]},p.destroy=function(){p.prototype._singleton.unglue(q);var a=p.prototype._singleton.htmlBridge;a.parentNode.removeChild(a),delete p.prototype._singleton},p.detectFlashSupport=function(){var a=!1;if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=!0)}catch(b){}return!a&&navigator.mimeTypes["application/x-shockwave-flash"]&&(a=!0),a};var t=null,u=null,v=function(){var a,b,c=p.prototype._singleton,d=document.getElementById("global-zeroclipboard-html-bridge");if(!d){var e={};for(var f in c.options)e[f]=c.options[f];e.amdModuleId=t,e.cjsModuleId=u;var g=l(e),h='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+c.options.moviePath+k(c.options.moviePath,c.options)+'"/>         <param name="allowScriptAccess" value="'+c.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+g+'"/>         <embed src="'+c.options.moviePath+k(c.options.moviePath,c.options)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+g+'"           scale="exactfit">         </embed>       </object>';d=document.createElement("div"),d.id="global-zeroclipboard-html-bridge",d.setAttribute("class","global-zeroclipboard-container"),d.setAttribute("data-clipboard-ready",!1),d.style.position="absolute",d.style.left="-9999px",d.style.top="-9999px",d.style.width="15px",d.style.height="15px",d.style.zIndex="9999",d.innerHTML=h,document.body.appendChild(d)}c.htmlBridge=d,a=document["global-zeroclipboard-flash-bridge"],a&&(b=a.length)&&(a=a[b-1]),c.flashBridge=a||d.children[0].lastElementChild};p.prototype.resetBridge=function(){return this.htmlBridge.style.left="-9999px",this.htmlBridge.style.top="-9999px",this.htmlBridge.removeAttribute("title"),this.htmlBridge.removeAttribute("data-clipboard-text"),h(a,this.options.activeClass),a=null,this.options.text=null,this},p.prototype.ready=function(){var a=this.htmlBridge.getAttribute("data-clipboard-ready");return"true"===a||a===!0},p.prototype.reposition=function(){if(!a)return!1;var b=j(a);return this.htmlBridge.style.top=b.top+"px",this.htmlBridge.style.left=b.left+"px",this.htmlBridge.style.width=b.width+"px",this.htmlBridge.style.height=b.height+"px",this.htmlBridge.style.zIndex=b.zIndex+1,this.setSize(b.width,b.height),this},p.dispatch=function(a,b){p.prototype._singleton.receiveEvent(a,b)},p.prototype.on=function(a,b){for(var c=a.toString().split(/\s/g),d=0;d<c.length;d++)a=c[d].toLowerCase().replace(/^on/,""),this.handlers[a]||(this.handlers[a]=b);return this.handlers.noflash&&!p.detectFlashSupport()&&this.receiveEvent("onNoFlash",null),this},p.prototype.addEventListener=p.prototype.on,p.prototype.off=function(a,b){for(var c=a.toString().split(/\s/g),d=0;d<c.length;d++){a=c[d].toLowerCase().replace(/^on/,"");for(var e in this.handlers)e===a&&this.handlers[e]===b&&delete this.handlers[e]}return this},p.prototype.removeEventListener=p.prototype.off,p.prototype.receiveEvent=function(b,c){b=b.toString().toLowerCase().replace(/^on/,"");var d=a,e=!0;switch(b){case"load":if(c&&parseFloat(c.flashVersion.replace(",",".").replace(/[^0-9\.]/gi,""))<10)return this.receiveEvent("onWrongFlash",{flashVersion:c.flashVersion}),void 0;this.htmlBridge.setAttribute("data-clipboard-ready",!0);break;case"mouseover":g(d,this.options.hoverClass);break;case"mouseout":h(d,this.options.hoverClass),this.resetBridge();break;case"mousedown":g(d,this.options.activeClass);break;case"mouseup":h(d,this.options.activeClass);break;case"datarequested":var f=d.getAttribute("data-clipboard-target"),i=f?document.getElementById(f):null;if(i){var j=i.value||i.textContent||i.innerText;j&&this.setText(j)}else{var k=d.getAttribute("data-clipboard-text");k&&this.setText(k)}e=!1;break;case"complete":this.options.text=null}if(this.handlers[b]){var l=this.handlers[b];"string"==typeof l&&"function"==typeof window[l]&&(l=window[l]),"function"==typeof l&&o(l,d,this,c,e)}},p.prototype.glue=function(a){a=n(a);for(var b=0;b<a.length;b++)-1==m(a[b],q)&&(q.push(a[b]),e(a[b],"mouseover",d));return this},p.prototype.unglue=function(a){a=n(a);for(var b=0;b<a.length;b++){f(a[b],"mouseover",d);var c=m(a[b],q);-1!=c&&q.splice(c,1)}return this},"function"==typeof define&&define.amd?define(["require","exports","module"],function(a,b,c){return t=c&&c.id||null,p}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?(u=module.id||null,module.exports=p):window.ZeroClipboard=p}();
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
        startLevel: 'h6', // node name, class or node array subscript [0|1]...n
        maxLevel: 'h6', // node name, class or node array subscript [0|1]...n
        nodes: ['h6'], // nodes for prepare toc, support class ['.p1', '.p2', '.p3', '.p4', '.p5', '.p6']
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






$(document).ready(function() {
    $('#example1').erToc({'goTopNode':'#example1', 'startLevel': 'h2', 'numberedSuffix':'. '});
    $('#example2').erToc({'goTopNode':'#example2', 'startLevel': 'h2', 'toc<a href="http://www.jqueryscript.net/tags.php?/Scroll/">Scroll</a>': false});
    $('#example3').erToc({'goTopNode':'#example3', 'startLevel': 'h2', 'numbered': false, 'tocClass': 'er_toc er_toc_disc'});
});

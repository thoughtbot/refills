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





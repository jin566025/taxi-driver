!function(d,b){var f=Math,r=b.createElement("div").style,l=function(){for(var o="t,webkitT,MozT,msT,OT".split(","),t=0,e=o.length;t<e;t++)if(o[t]+"ransform"in r)return o[t].substr(0,o[t].length-1);return!1}(),n=l?"-"+l.toLowerCase()+"-":"",x=e("transform"),s=e("transitionProperty"),g=e("transitionDuration"),i=e("transformOrigin"),a=e("transitionTimingFunction"),c=e("transitionDelay"),p=/android/gi.test(navigator.appVersion),m=/iphone|ipad/gi.test(navigator.appVersion),o=/hp-tablet/gi.test(navigator.appVersion),h=e("perspective")in r,y="ontouchstart"in d&&!o,u=!1!==l,S=e("transition")in r,v="onorientationchange"in d?"orientationchange":"resize",Y=y?"touchstart":"mousedown",T=y?"touchmove":"mousemove",X=y?"touchend":"mouseup",w=y?"touchcancel":"mouseup",_=function(){if(!1===l)return!1;return{"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"}[l]}(),z=d.requestAnimationFrame||d.webkitRequestAnimationFrame||d.mozRequestAnimationFrame||d.oRequestAnimationFrame||d.msRequestAnimationFrame||function(o){return setTimeout(o,1)},M=d.cancelRequestAnimationFrame||d.webkitCancelAnimationFrame||d.webkitCancelRequestAnimationFrame||d.mozCancelRequestAnimationFrame||d.oCancelRequestAnimationFrame||d.msCancelRequestAnimationFrame||clearTimeout,E=h?" translateZ(0)":"",t=function(o,t){var e,r=this;for(e in r.wrapper="object"==typeof o?o:b.getElementById(o),r.wrapper.style.overflow="hidden",r.scroller=r.wrapper.children[0],r.options={hScroll:!0,vScroll:!0,x:0,y:0,bounce:!0,bounceLock:!1,momentum:!0,lockDirection:!0,useTransform:!0,useTransition:!1,topOffset:0,checkDOMChanges:!1,handleClick:!0,hScrollbar:!0,vScrollbar:!0,fixedScrollbar:p,hideScrollbar:m,fadeScrollbar:m&&h,scrollbarClass:"",zoom:!1,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:!1,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(o){o.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null},t)r.options[e]=t[e];r.x=r.options.x,r.y=r.options.y,r.options.useTransform=u&&r.options.useTransform,r.options.hScrollbar=r.options.hScroll&&r.options.hScrollbar,r.options.vScrollbar=r.options.vScroll&&r.options.vScrollbar,r.options.zoom=r.options.useTransform&&r.options.zoom,r.options.useTransition=S&&r.options.useTransition,r.options.zoom&&p&&(E=""),r.scroller.style[s]=r.options.useTransform?n+"transform":"top left",r.scroller.style[g]="0",r.scroller.style[i]="0 0",r.options.useTransition&&(r.scroller.style[a]="cubic-bezier(0.33,0.66,0.66,1)"),r.options.useTransform?r.scroller.style[x]="translate("+r.x+"px,"+r.y+"px)"+E:r.scroller.style.cssText+=";position:absolute;top:"+r.y+"px;left:"+r.x+"px",r.options.useTransition&&(r.options.fixedScrollbar=!0),r.refresh(),r._bind(v,d),r._bind(Y),y||"none"!=r.options.wheelAction&&(r._bind("DOMMouseScroll"),r._bind("mousewheel")),r.options.checkDOMChanges&&(r.checkDOMTime=setInterval(function(){r._checkDOMChanges()},500))};function e(o){return""===l?o:(o=o.charAt(0).toUpperCase()+o.substr(1),l+o)}t.prototype={enabled:!0,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(o){var t=this;switch(o.type){case Y:if(!y&&0!==o.button)return;t._start(o);break;case T:t._move(o);break;case X:case w:t._end(o);break;case v:t._resize();break;case"DOMMouseScroll":case"mousewheel":t._wheel(o);break;case _:t._transitionEnd(o)}},_checkDOMChanges:function(){this.moved||this.zoomed||this.animating||this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale||this.refresh()},_scrollbar:function(o){var t,e=this;e[o+"Scrollbar"]?(e[o+"ScrollbarWrapper"]||(t=b.createElement("div"),e.options.scrollbarClass?t.className=e.options.scrollbarClass+o.toUpperCase():t.style.cssText="position:absolute;z-index:100;"+("h"==o?"height:7px;bottom:1px;left:2px;right:"+(e.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(e.hScrollbar?"7":"2")+"px;top:2px;right:1px"),t.style.cssText+=";pointer-events:none;"+n+"transition-property:opacity;"+n+"transition-duration:"+(e.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(e.options.hideScrollbar?"0":"1"),e.wrapper.appendChild(t),e[o+"ScrollbarWrapper"]=t,t=b.createElement("div"),e.options.scrollbarClass||(t.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);"+n+"background-clip:padding-box;"+n+"box-sizing:border-box;"+("h"==o?"height:100%":"width:100%")+";"+n+"border-radius:3px;border-radius:3px"),t.style.cssText+=";pointer-events:none;"+n+"transition-property:"+n+"transform;"+n+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);"+n+"transition-duration:0;"+n+"transform: translate(0,0)"+E,e.options.useTransition&&(t.style.cssText+=";"+n+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"),e[o+"ScrollbarWrapper"].appendChild(t),e[o+"ScrollbarIndicator"]=t),"h"==o?(e.hScrollbarSize=e.hScrollbarWrapper.clientWidth,e.hScrollbarIndicatorSize=f.max(f.round(e.hScrollbarSize*e.hScrollbarSize/e.scrollerW),8),e.hScrollbarIndicator.style.width=e.hScrollbarIndicatorSize+"px",e.hScrollbarMaxScroll=e.hScrollbarSize-e.hScrollbarIndicatorSize,e.hScrollbarProp=e.hScrollbarMaxScroll/e.maxScrollX):(e.vScrollbarSize=e.vScrollbarWrapper.clientHeight,e.vScrollbarIndicatorSize=f.max(f.round(e.vScrollbarSize*e.vScrollbarSize/e.scrollerH),8),e.vScrollbarIndicator.style.height=e.vScrollbarIndicatorSize+"px",e.vScrollbarMaxScroll=e.vScrollbarSize-e.vScrollbarIndicatorSize,e.vScrollbarProp=e.vScrollbarMaxScroll/e.maxScrollY),e._scrollbarPos(o,!0)):e[o+"ScrollbarWrapper"]&&(u&&(e[o+"ScrollbarIndicator"].style[x]=""),e[o+"ScrollbarWrapper"].parentNode.removeChild(e[o+"ScrollbarWrapper"]),e[o+"ScrollbarWrapper"]=null,e[o+"ScrollbarIndicator"]=null)},_resize:function(){var o=this;setTimeout(function(){o.refresh()},p?200:0)},_pos:function(o,t){this.zoomed||(o=this.hScroll?o:0,t=this.vScroll?t:0,this.options.useTransform?this.scroller.style[x]="translate("+o+"px,"+t+"px) scale("+this.scale+")"+E:(o=f.round(o),t=f.round(t),this.scroller.style.left=o+"px",this.scroller.style.top=t+"px"),this.x=o,this.y=t,this._scrollbarPos("h"),this._scrollbarPos("v"))},_scrollbarPos:function(o,t){var e,r=this,l="h"==o?r.x:r.y;r[o+"Scrollbar"]&&((l=r[o+"ScrollbarProp"]*l)<0?(r.options.fixedScrollbar||((e=r[o+"ScrollbarIndicatorSize"]+f.round(3*l))<8&&(e=8),r[o+"ScrollbarIndicator"].style["h"==o?"width":"height"]=e+"px"),l=0):l>r[o+"ScrollbarMaxScroll"]&&(r.options.fixedScrollbar?l=r[o+"ScrollbarMaxScroll"]:((e=r[o+"ScrollbarIndicatorSize"]-f.round(3*(l-r[o+"ScrollbarMaxScroll"])))<8&&(e=8),r[o+"ScrollbarIndicator"].style["h"==o?"width":"height"]=e+"px",l=r[o+"ScrollbarMaxScroll"]+(r[o+"ScrollbarIndicatorSize"]-e))),r[o+"ScrollbarWrapper"].style[c]="0",r[o+"ScrollbarWrapper"].style.opacity=t&&r.options.hideScrollbar?"0":"1",r[o+"ScrollbarIndicator"].style[x]="translate("+("h"==o?l+"px,0)":"0,"+l+"px)")+E)},_start:function(o){var t,e,r,l,n,s=this,i=y?o.touches[0]:o;s.enabled&&(s.options.onBeforeScrollStart&&s.options.onBeforeScrollStart.call(s,o),(s.options.useTransition||s.options.zoom)&&s._transitionTime(0),s.moved=!1,s.animating=!1,s.zoomed=!1,s.distX=0,s.distY=0,s.absDistX=0,s.absDistY=0,s.dirX=0,s.dirY=0,s.options.zoom&&y&&1<o.touches.length&&(l=f.abs(o.touches[0].pageX-o.touches[1].pageX),n=f.abs(o.touches[0].pageY-o.touches[1].pageY),s.touchesDistStart=f.sqrt(l*l+n*n),s.originX=f.abs(o.touches[0].pageX+o.touches[1].pageX-2*s.wrapperOffsetLeft)/2-s.x,s.originY=f.abs(o.touches[0].pageY+o.touches[1].pageY-2*s.wrapperOffsetTop)/2-s.y,s.options.onZoomStart&&s.options.onZoomStart.call(s,o)),s.options.momentum&&(s.options.useTransform?(e=+((t=getComputedStyle(s.scroller,null)[x].replace(/[^0-9\-.,]/g,"").split(","))[12]||t[4]),r=+(t[13]||t[5])):(e=+getComputedStyle(s.scroller,null).left.replace(/[^0-9-]/g,""),r=+getComputedStyle(s.scroller,null).top.replace(/[^0-9-]/g,"")),e==s.x&&r==s.y||(s.options.useTransition?s._unbind(_):M(s.aniTime),s.steps=[],s._pos(e,r),s.options.onScrollEnd&&s.options.onScrollEnd.call(s))),s.absStartX=s.x,s.absStartY=s.y,s.startX=s.x,s.startY=s.y,s.pointX=i.pageX,s.pointY=i.pageY,s.startTime=o.timeStamp||Date.now(),s.options.onScrollStart&&s.options.onScrollStart.call(s,o),s._bind(T,d),s._bind(X,d),s._bind(w,d))},_move:function(o){var t,e,r,l=this,n=y?o.touches[0]:o,s=n.pageX-l.pointX,i=n.pageY-l.pointY,a=l.x+s,c=l.y+i,p=o.timeStamp||Date.now();if(l.options.onBeforeScrollMove&&l.options.onBeforeScrollMove.call(l,o),l.options.zoom&&y&&1<o.touches.length)return t=f.abs(o.touches[0].pageX-o.touches[1].pageX),e=f.abs(o.touches[0].pageY-o.touches[1].pageY),l.touchesDist=f.sqrt(t*t+e*e),l.zoomed=!0,(r=1/l.touchesDistStart*l.touchesDist*this.scale)<l.options.zoomMin?r=.5*l.options.zoomMin*Math.pow(2,r/l.options.zoomMin):r>l.options.zoomMax&&(r=2*l.options.zoomMax*Math.pow(.5,l.options.zoomMax/r)),l.lastScale=r/this.scale,a=this.originX-this.originX*l.lastScale+this.x,c=this.originY-this.originY*l.lastScale+this.y,this.scroller.style[x]="translate("+a+"px,"+c+"px) scale("+r+")"+E,void(l.options.onZoom&&l.options.onZoom.call(l,o));l.pointX=n.pageX,l.pointY=n.pageY,(0<a||a<l.maxScrollX)&&(a=l.options.bounce?l.x+s/2:0<=a||0<=l.maxScrollX?0:l.maxScrollX),(c>l.minScrollY||c<l.maxScrollY)&&(c=l.options.bounce?l.y+i/2:c>=l.minScrollY||0<=l.maxScrollY?l.minScrollY:l.maxScrollY),l.distX+=s,l.distY+=i,l.absDistX=f.abs(l.distX),l.absDistY=f.abs(l.distY),l.absDistX<6&&l.absDistY<6||(l.options.lockDirection&&(l.absDistX>l.absDistY+5?(c=l.y,i=0):l.absDistY>l.absDistX+5&&(a=l.x,s=0)),l.moved=!0,l._pos(a,c),l.dirX=0<s?-1:s<0?1:0,l.dirY=0<i?-1:i<0?1:0,300<p-l.startTime&&(l.startTime=p,l.startX=l.x,l.startY=l.y),l.options.onScrollMove&&l.options.onScrollMove.call(l,o))},_end:function(o){if(!y||0===o.touches.length){var t,e,r,l,n,s,i,a=this,c=y?o.changedTouches[0]:o,p={dist:0,time:0},m={dist:0,time:0},h=(o.timeStamp||Date.now())-a.startTime,u=a.x,S=a.y;if(a._unbind(T,d),a._unbind(X,d),a._unbind(w,d),a.options.onBeforeScrollEnd&&a.options.onBeforeScrollEnd.call(a,o),a.zoomed)return i=a.scale*a.lastScale,i=Math.max(a.options.zoomMin,i),i=Math.min(a.options.zoomMax,i),a.lastScale=i/a.scale,a.scale=i,a.x=a.originX-a.originX*a.lastScale+a.x,a.y=a.originY-a.originY*a.lastScale+a.y,a.scroller.style[g]="200ms",a.scroller.style[x]="translate("+a.x+"px,"+a.y+"px) scale("+a.scale+")"+E,a.zoomed=!1,a.refresh(),void(a.options.onZoomEnd&&a.options.onZoomEnd.call(a,o));if(!a.moved)return y&&(a.doubleTapTimer&&a.options.zoom?(clearTimeout(a.doubleTapTimer),a.doubleTapTimer=null,a.options.onZoomStart&&a.options.onZoomStart.call(a,o),a.zoom(a.pointX,a.pointY,1==a.scale?a.options.doubleTapZoom:1),a.options.onZoomEnd&&setTimeout(function(){a.options.onZoomEnd.call(a,o)},200)):this.options.handleClick&&(a.doubleTapTimer=setTimeout(function(){for(a.doubleTapTimer=null,t=c.target;1!=t.nodeType;)t=t.parentNode;"SELECT"!=t.tagName&&"INPUT"!=t.tagName&&"TEXTAREA"!=t.tagName&&((e=b.createEvent("MouseEvents")).initMouseEvent("click",!0,!0,o.view,1,c.screenX,c.screenY,c.clientX,c.clientY,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,0,null),e._fake=!0,t.dispatchEvent(e))},a.options.zoom?250:0))),a._resetPos(400),void(a.options.onTouchEnd&&a.options.onTouchEnd.call(a,o));if(h<300&&a.options.momentum&&(p=u?a._momentum(u-a.startX,h,-a.x,a.scrollerW-a.wrapperW+a.x,a.options.bounce?a.wrapperW:0):p,m=S?a._momentum(S-a.startY,h,-a.y,a.maxScrollY<0?a.scrollerH-a.wrapperH+a.y-a.minScrollY:0,a.options.bounce?a.wrapperH:0):m,u=a.x+p.dist,S=a.y+m.dist,(0<a.x&&0<u||a.x<a.maxScrollX&&u<a.maxScrollX)&&(p={dist:0,time:0}),(a.y>a.minScrollY&&S>a.minScrollY||a.y<a.maxScrollY&&S<a.maxScrollY)&&(m={dist:0,time:0})),p.dist||m.dist)return n=f.max(f.max(p.time,m.time),10),a.options.snap&&(r=u-a.absStartX,l=S-a.absStartY,f.abs(r)<a.options.snapThreshold&&f.abs(l)<a.options.snapThreshold?a.scrollTo(a.absStartX,a.absStartY,200):(u=(s=a._snap(u,S)).x,S=s.y,n=f.max(s.time,n))),a.scrollTo(f.round(u),f.round(S),n),void(a.options.onTouchEnd&&a.options.onTouchEnd.call(a,o));if(a.options.snap)return r=u-a.absStartX,l=S-a.absStartY,f.abs(r)<a.options.snapThreshold&&f.abs(l)<a.options.snapThreshold?a.scrollTo(a.absStartX,a.absStartY,200):(s=a._snap(a.x,a.y)).x==a.x&&s.y==a.y||a.scrollTo(s.x,s.y,s.time),void(a.options.onTouchEnd&&a.options.onTouchEnd.call(a,o));a._resetPos(200),a.options.onTouchEnd&&a.options.onTouchEnd.call(a,o)}},_resetPos:function(o){var t=this,e=0<=t.x?0:t.x<t.maxScrollX?t.maxScrollX:t.x,r=t.y>=t.minScrollY||0<t.maxScrollY?t.minScrollY:t.y<t.maxScrollY?t.maxScrollY:t.y;if(e==t.x&&r==t.y)return t.moved&&(t.moved=!1,t.options.onScrollEnd&&t.options.onScrollEnd.call(t)),t.hScrollbar&&t.options.hideScrollbar&&("webkit"==l&&(t.hScrollbarWrapper.style[c]="300ms"),t.hScrollbarWrapper.style.opacity="0"),void(t.vScrollbar&&t.options.hideScrollbar&&("webkit"==l&&(t.vScrollbarWrapper.style[c]="300ms"),t.vScrollbarWrapper.style.opacity="0"));t.scrollTo(e,r,o||0)},_wheel:function(o){var t,e,r,l,n,s=this;if("wheelDeltaX"in o)t=o.wheelDeltaX/12,e=o.wheelDeltaY/12;else if("wheelDelta"in o)t=e=o.wheelDelta/12;else{if(!("detail"in o))return;t=e=3*-o.detail}if("zoom"==s.options.wheelAction)return(n=s.scale*Math.pow(2,1/3*(e?e/Math.abs(e):0)))<s.options.zoomMin&&(n=s.options.zoomMin),n>s.options.zoomMax&&(n=s.options.zoomMax),void(n!=s.scale&&(!s.wheelZoomCount&&s.options.onZoomStart&&s.options.onZoomStart.call(s,o),s.wheelZoomCount++,s.zoom(o.pageX,o.pageY,n,400),setTimeout(function(){s.wheelZoomCount--,!s.wheelZoomCount&&s.options.onZoomEnd&&s.options.onZoomEnd.call(s,o)},400)));r=s.x+t,l=s.y+e,0<r?r=0:r<s.maxScrollX&&(r=s.maxScrollX),l>s.minScrollY?l=s.minScrollY:l<s.maxScrollY&&(l=s.maxScrollY),s.maxScrollY<0&&s.scrollTo(r,l,0)},_transitionEnd:function(o){o.target==this.scroller&&(this._unbind(_),this._startAni())},_startAni:function(){var r,l,n,s=this,i=s.x,a=s.y,c=Date.now();if(!s.animating)if(s.steps.length){if((r=s.steps.shift()).x==i&&r.y==a&&(r.time=0),s.animating=!0,s.moved=!0,s.options.useTransition)return s._transitionTime(r.time),s._pos(r.x,r.y),s.animating=!1,void(r.time?s._bind(_):s._resetPos(0));(n=function(){var o,t,e=Date.now();if(e>=c+r.time)return s._pos(r.x,r.y),s.animating=!1,s.options.onAnimationEnd&&s.options.onAnimationEnd.call(s),void s._startAni();e=(e-c)/r.time-1,l=f.sqrt(1-e*e),o=(r.x-i)*l+i,t=(r.y-a)*l+a,s._pos(o,t),s.animating&&(s.aniTime=z(n))})()}else s._resetPos(400)},_transitionTime:function(o){o+="ms",this.scroller.style[g]=o,this.hScrollbar&&(this.hScrollbarIndicator.style[g]=o),this.vScrollbar&&(this.vScrollbarIndicator.style[g]=o)},_momentum:function(o,t,e,r,l){var n,s=f.abs(o)/t,i=s*s/.0012;return 0<o&&e<i?(s=s*(e+=l/(6/(i/s*6e-4)))/i,i=e):o<0&&r<i&&(s=s*(r+=l/(6/(i/s*6e-4)))/i,i=r),n=s/6e-4,{dist:i*=o<0?-1:1,time:f.round(n)}},_offset:function(o){for(var t=-o.offsetLeft,e=-o.offsetTop;o=o.offsetParent;)t-=o.offsetLeft,e-=o.offsetTop;return o!=this.wrapper&&(t*=this.scale,e*=this.scale),{left:t,top:e}},_snap:function(o,t){var e,r,l,n,s,i=this;for(l=i.pagesX.length-1,e=0,r=i.pagesX.length;e<r;e++)if(o>=i.pagesX[e]){l=e;break}for(l==i.currPageX&&0<l&&i.dirX<0&&l--,o=i.pagesX[l],n=(n=f.abs(o-i.pagesX[i.currPageX]))?f.abs(i.x-o)/n*500:0,i.currPageX=l,l=i.pagesY.length-1,e=0;e<l;e++)if(t>=i.pagesY[e]){l=e;break}return l==i.currPageY&&0<l&&i.dirY<0&&l--,t=i.pagesY[l],s=(s=f.abs(t-i.pagesY[i.currPageY]))?f.abs(i.y-t)/s*500:0,i.currPageY=l,{x:o,y:t,time:f.round(f.max(n,s))||200}},_bind:function(o,t,e){(t||this.scroller).addEventListener(o,this,!!e)},_unbind:function(o,t,e){(t||this.scroller).removeEventListener(o,this,!!e)},destroy:function(){var o=this;o.scroller.style[x]="",o.hScrollbar=!1,o.vScrollbar=!1,o._scrollbar("h"),o._scrollbar("v"),o._unbind(v,d),o._unbind(Y),o._unbind(T,d),o._unbind(X,d),o._unbind(w,d),o.options.hasTouch||(o._unbind("DOMMouseScroll"),o._unbind("mousewheel")),o.options.useTransition&&o._unbind(_),o.options.checkDOMChanges&&clearInterval(o.checkDOMTime),o.options.onDestroy&&o.options.onDestroy.call(o)},refresh:function(){var o,t,e,r,l=this,n=0,s=0;if(l.scale<l.options.zoomMin&&(l.scale=l.options.zoomMin),l.wrapperW=l.wrapper.clientWidth||1,l.wrapperH=l.wrapper.clientHeight||1,l.minScrollY=-l.options.topOffset||0,l.scrollerW=f.round(l.scroller.offsetWidth*l.scale),l.scrollerH=f.round((l.scroller.offsetHeight+l.minScrollY)*l.scale),l.maxScrollX=l.wrapperW-l.scrollerW,l.maxScrollY=l.wrapperH-l.scrollerH+l.minScrollY,l.dirX=0,l.dirY=0,l.options.onRefresh&&l.options.onRefresh.call(l),l.hScroll=l.options.hScroll&&l.maxScrollX<0,l.vScroll=l.options.vScroll&&(!l.options.bounceLock&&!l.hScroll||l.scrollerH>l.wrapperH),l.hScrollbar=l.hScroll&&l.options.hScrollbar,l.vScrollbar=l.vScroll&&l.options.vScrollbar&&l.scrollerH>l.wrapperH,o=l._offset(l.wrapper),l.wrapperOffsetLeft=-o.left,l.wrapperOffsetTop=-o.top,"string"==typeof l.options.snap)for(l.pagesX=[],l.pagesY=[],t=0,e=(r=l.scroller.querySelectorAll(l.options.snap)).length;t<e;t++)(n=l._offset(r[t])).left+=l.wrapperOffsetLeft,n.top+=l.wrapperOffsetTop,l.pagesX[t]=n.left<l.maxScrollX?l.maxScrollX:n.left*l.scale,l.pagesY[t]=n.top<l.maxScrollY?l.maxScrollY:n.top*l.scale;else if(l.options.snap){for(l.pagesX=[];n>=l.maxScrollX;)l.pagesX[s]=n,n-=l.wrapperW,s++;for(l.maxScrollX%l.wrapperW&&(l.pagesX[l.pagesX.length]=l.maxScrollX-l.pagesX[l.pagesX.length-1]+l.pagesX[l.pagesX.length-1]),s=n=0,l.pagesY=[];n>=l.maxScrollY;)l.pagesY[s]=n,n-=l.wrapperH,s++;l.maxScrollY%l.wrapperH&&(l.pagesY[l.pagesY.length]=l.maxScrollY-l.pagesY[l.pagesY.length-1]+l.pagesY[l.pagesY.length-1])}l._scrollbar("h"),l._scrollbar("v"),l.zoomed||(l.scroller.style[g]="0",l._resetPos(400))},scrollTo:function(o,t,e,r){var l,n,s=this,i=o;for(s.stop(),i.length||(i=[{x:o,y:t,time:e,relative:r}]),l=0,n=i.length;l<n;l++)i[l].relative&&(i[l].x=s.x-i[l].x,i[l].y=s.y-i[l].y),s.steps.push({x:i[l].x,y:i[l].y,time:i[l].time||0});s._startAni()},scrollToElement:function(o,t){var e,r=this;(o=o.nodeType?o:r.scroller.querySelector(o))&&((e=r._offset(o)).left+=r.wrapperOffsetLeft,e.top+=r.wrapperOffsetTop,e.left=0<e.left?0:e.left<r.maxScrollX?r.maxScrollX:e.left,e.top=e.top>r.minScrollY?r.minScrollY:e.top<r.maxScrollY?r.maxScrollY:e.top,t=void 0===t?f.max(2*f.abs(e.left),2*f.abs(e.top)):t,r.scrollTo(e.left,e.top,t))},scrollToPage:function(o,t,e){var r,l,n=this;e=void 0===e?400:e,n.options.onScrollStart&&n.options.onScrollStart.call(n),n.options.snap?(o="next"==o?n.currPageX+1:"prev"==o?n.currPageX-1:o,t="next"==t?n.currPageY+1:"prev"==t?n.currPageY-1:t,o=o<0?0:o>n.pagesX.length-1?n.pagesX.length-1:o,t=t<0?0:t>n.pagesY.length-1?n.pagesY.length-1:t,n.currPageX=o,n.currPageY=t,r=n.pagesX[o],l=n.pagesY[t]):(r=-n.wrapperW*o,l=-n.wrapperH*t,r<n.maxScrollX&&(r=n.maxScrollX),l<n.maxScrollY&&(l=n.maxScrollY)),n.scrollTo(r,l,e)},disable:function(){this.stop(),this._resetPos(0),this.enabled=!1,this._unbind(T,d),this._unbind(X,d),this._unbind(w,d)},enable:function(){this.enabled=!0},stop:function(){this.options.useTransition?this._unbind(_):M(this.aniTime),this.steps=[],this.moved=!1,this.animating=!1},zoom:function(o,t,e,r){var l=this,n=e/l.scale;l.options.useTransform&&(l.zoomed=!0,r=void 0===r?200:r,o=o-l.wrapperOffsetLeft-l.x,t=t-l.wrapperOffsetTop-l.y,l.x=o-o*n+l.x,l.y=t-t*n+l.y,l.scale=e,l.refresh(),l.x=0<l.x?0:l.x<l.maxScrollX?l.maxScrollX:l.x,l.y=l.y>l.minScrollY?l.minScrollY:l.y<l.maxScrollY?l.maxScrollY:l.y,l.scroller.style[g]=r+"ms",l.scroller.style[x]="translate("+l.x+"px,"+l.y+"px) scale("+e+")"+E,l.zoomed=!1)},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating}},r=null,"undefined"!=typeof exports?exports.iScroll=t:d.iScroll=t}(window,document);
/*! For license information please see 81c7c4f87996ee8daa78ea5324fefcd7233fafa9-3c596338b26f462cdd11.js.LICENSE.txt */
(self.webpackChunkxaiprimer_app=self.webpackChunkxaiprimer_app||[]).push([[580],{2122:function(e,t,n){"use strict";function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.d(t,{Z:function(){return r}})},9756:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n.d(t,{Z:function(){return r}})},3112:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7294);var a=function(e){var t=(0,r.useRef)(e);return(0,r.useEffect)((function(){t.current=e}),[e]),t};function i(e){var t=a(e);return(0,r.useCallback)((function(){return t.current&&t.current.apply(t,arguments)}),[t])}},9931:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=a.apply(null,n);o&&e.push(o)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var u in n)r.call(n,u)&&n[u]&&e.push(u);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},9984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];function r(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=null;return t.forEach((function(e){if(null==a){var t=e.apply(void 0,n);null!=t&&(a=t)}})),a}return(0,i.default)(r)};var r,a=n(3521),i=(r=a)&&r.__esModule?r:{default:r};e.exports=t.default},3521:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,r,a,i,o){var u=a||"<<anonymous>>",s=o||r;if(null==n[r])return t?new Error("Required "+i+" `"+s+"` was not specified in `"+u+"`."):null;for(var l=arguments.length,c=Array(l>6?l-6:0),f=6;f<l;f++)c[f-6]=arguments[f];return e.apply(void 0,[n,r,u,i,s].concat(c))}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n},e.exports=t.default},2924:function(e,t,n){"use strict";var r=n(7294).createContext(null);r.displayName="CardContext",t.Z=r},8429:function(e,t,n){"use strict";n.d(t,{Z:function(){return k}});var r=n(2122),a=n(9756),i=n(9931),o=n.n(i),u=(n(9984),n(7294)),s=n(6739),l=n(9385),c=n(8852),f=n(2924),d=Function.prototype.bind.call(Function.prototype.call,[].slice);var v=function(e){return e&&"function"!=typeof e?function(t){e.current=t}:e};var p=function(e,t){return(0,u.useMemo)((function(){return function(e,t){var n=v(e),r=v(t);return function(e){n&&n(e),r&&r(e)}}(e,t)}),[e,t])},m=n(2752),E=n(3342),h=n(7257),x=["as","onSelect","activeKey","role","onKeyDown"],b=function(){},y=u.forwardRef((function(e,t){var n,i,o=e.as,s=void 0===o?"ul":o,l=e.onSelect,c=e.activeKey,f=e.role,v=e.onKeyDown,y=(0,a.Z)(e,x),g=(0,u.useReducer)((function(e){return!e}),!1)[1],Z=(0,u.useRef)(!1),N=(0,u.useContext)(E.Z),C=(0,u.useContext)(h.Z);C&&(f=f||"tablist",c=C.activeKey,n=C.getControlledId,i=C.getControllerId);var k=(0,u.useRef)(null),w=function(e){var t=k.current;if(!t)return null;var n,r=(n="[data-rb-event-key]:not(.disabled)",d(t.querySelectorAll(n))),a=t.querySelector(".active");if(!a)return null;var i=r.indexOf(a);if(-1===i)return null;var o=i+e;return o>=r.length&&(o=0),o<0&&(o=r.length-1),r[o]},P=function(e,t){null!=e&&(l&&l(e,t),N&&N(e,t))};(0,u.useEffect)((function(){if(k.current&&Z.current){var e=k.current.querySelector("[data-rb-event-key].active");e&&e.focus()}Z.current=!1}));var S=p(t,k);return u.createElement(E.Z.Provider,{value:P},u.createElement(m.Z.Provider,{value:{role:f,activeKey:(0,E.h)(c),getControlledId:n||b,getControllerId:i||b}},u.createElement(s,(0,r.Z)({},y,{onKeyDown:function(e){var t;switch(v&&v(e),e.key){case"ArrowLeft":case"ArrowUp":t=w(-1);break;case"ArrowRight":case"ArrowDown":t=w(1);break;default:return}t&&(e.preventDefault(),P(t.dataset.rbEventKey,e),Z.current=!0,g())},ref:S,role:f}))))})),g=n(289),Z=n(1507),N=["as","bsPrefix","variant","fill","justify","navbar","navbarScroll","className","children","activeKey"],C=u.forwardRef((function(e,t){var n,i,d,v=(0,s.Ch)(e,{activeKey:"onSelect"}),p=v.as,m=void 0===p?"div":p,E=v.bsPrefix,h=v.variant,x=v.fill,b=v.justify,g=v.navbar,Z=v.navbarScroll,C=v.className,k=v.children,w=v.activeKey,P=(0,a.Z)(v,N),S=(0,l.vE)(E,"nav"),O=!1,T=(0,u.useContext)(c.Z),L=(0,u.useContext)(f.Z);return T?(i=T.bsPrefix,O=null==g||g):L&&(d=L.cardHeaderBsPrefix),u.createElement(y,(0,r.Z)({as:m,ref:t,activeKey:w,className:o()(C,(n={},n[S]=!O,n[i+"-nav"]=O,n[i+"-nav-scroll"]=O&&Z,n[d+"-"+h]=!!d,n[S+"-"+h]=!!h,n[S+"-fill"]=x,n[S+"-justified"]=b,n))},P),k)}));C.displayName="Nav",C.defaultProps={justify:!1,fill:!1},C.Item=g.Z,C.Link=Z.Z;var k=C},2752:function(e,t,n){"use strict";var r=n(7294).createContext(null);r.displayName="NavContext",t.Z=r},289:function(e,t,n){"use strict";var r=n(2122),a=n(9756),i=n(9931),o=n.n(i),u=n(7294),s=n(9385),l=["bsPrefix","className","children","as"],c=u.forwardRef((function(e,t){var n=e.bsPrefix,i=e.className,c=e.children,f=e.as,d=void 0===f?"div":f,v=(0,a.Z)(e,l);return n=(0,s.vE)(n,"nav-item"),u.createElement(d,(0,r.Z)({},v,{ref:t,className:o()(i,n)}),c)}));c.displayName="NavItem",t.Z=c},1507:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var r=n(2122),a=n(9756),i=n(9931),o=n.n(i),u=n(7294),s=n(8268),l=n(3112),c=(n(2473),n(2752)),f=n(3342),d=["active","className","eventKey","onSelect","onClick","as"],v=u.forwardRef((function(e,t){var n=e.active,i=e.className,s=e.eventKey,v=e.onSelect,p=e.onClick,m=e.as,E=(0,a.Z)(e,d),h=(0,f.h)(s,E.href),x=(0,u.useContext)(f.Z),b=(0,u.useContext)(c.Z),y=n;if(b){E.role||"tablist"!==b.role||(E.role="tab");var g=b.getControllerId(h),Z=b.getControlledId(h);E["data-rb-event-key"]=h,E.id=g||E.id,E["aria-controls"]=Z||E["aria-controls"],y=null==n&&null!=h?b.activeKey===h:n}"tab"===E.role&&(E.disabled&&(E.tabIndex=-1,E["aria-disabled"]=!0),E["aria-selected"]=y);var N=(0,l.Z)((function(e){p&&p(e),null!=h&&(v&&v(h,e),x&&x(h,e))}));return u.createElement(m,(0,r.Z)({},E,{ref:t,onClick:N,className:o()(i,y&&"active")}))}));v.defaultProps={disabled:!1};var p=v,m=n(9385),E=["bsPrefix","disabled","className","href","eventKey","onSelect","as"],h={disabled:!1,as:s.Z},x=u.forwardRef((function(e,t){var n=e.bsPrefix,i=e.disabled,s=e.className,l=e.href,c=e.eventKey,f=e.onSelect,d=e.as,v=(0,a.Z)(e,E);return n=(0,m.vE)(n,"nav-link"),u.createElement(p,(0,r.Z)({},v,{href:l,ref:t,eventKey:c,as:d,disabled:i,onSelect:f,className:o()(s,n,i&&"disabled")}))}));x.displayName="NavLink",x.defaultProps=h;var b=x},8852:function(e,t,n){"use strict";var r=n(7294).createContext(null);r.displayName="NavbarContext",t.Z=r},8268:function(e,t,n){"use strict";var r=n(2122),a=n(9756),i=n(7294),o=n(3656),u=["as","disabled","onKeyDown"];function s(e){return!e||"#"===e.trim()}var l=i.forwardRef((function(e,t){var n=e.as,l=void 0===n?"a":n,c=e.disabled,f=e.onKeyDown,d=(0,a.Z)(e,u),v=function(e){var t=d.href,n=d.onClick;(c||s(t))&&e.preventDefault(),c?e.stopPropagation():n&&n(e)};return s(d.href)&&(d.role=d.role||"button",d.href=d.href||"#"),c&&(d.tabIndex=-1,d["aria-disabled"]=!0),i.createElement(l,(0,r.Z)({ref:t},d,{onClick:v,onKeyDown:(0,o.Z)((function(e){" "===e.key&&(e.preventDefault(),v(e))}),f)}))}));l.displayName="SafeAnchor",t.Z=l},3342:function(e,t,n){"use strict";n.d(t,{h:function(){return a}});var r=n(7294).createContext(null),a=function(e,t){return void 0===t&&(t=null),null!=e?String(e):t||null};t.Z=r},7257:function(e,t,n){"use strict";var r=n(7294).createContext(null);t.Z=r},9385:function(e,t,n){"use strict";n.d(t,{vE:function(){return i}});var r=n(7294),a=r.createContext({});a.Consumer,a.Provider;function i(e,t){var n=(0,r.useContext)(a);return e||n[t]||t}},3656:function(e,t){"use strict";t.Z=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return null!=e})).reduce((function(e,t){if("function"!=typeof t)throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?t:function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];e.apply(this,r),t.apply(this,r)}}),null)}},2665:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(2122),a=n(9756),i=n(9931),o=n.n(i),u=/-(.)/g;var s=n(7294),l=n(9385),c=["className","bsPrefix","as"],f=function(e){return e[0].toUpperCase()+(t=e,t.replace(u,(function(e,t){return t.toUpperCase()}))).slice(1);var t};function d(e,t){var n=void 0===t?{}:t,i=n.displayName,u=void 0===i?f(e):i,d=n.Component,v=n.defaultProps,p=s.forwardRef((function(t,n){var i=t.className,u=t.bsPrefix,f=t.as,v=void 0===f?d||"div":f,p=(0,a.Z)(t,c),m=(0,l.vE)(u,e);return s.createElement(v,(0,r.Z)({ref:n,className:o()(i,m)},p))}));return p.defaultProps=v,p.displayName=u,p}},473:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(3164),a=n(4302);function i(e,t,n){void 0===n&&(n=5);var r=!1,i=setTimeout((function(){r||function(e,t,n,r){if(void 0===n&&(n=!1),void 0===r&&(r=!0),e){var a=document.createEvent("HTMLEvents");a.initEvent(t,n,r),e.dispatchEvent(a)}}(e,"transitionend",!0)}),t+n),o=(0,a.Z)(e,"transitionend",(function(){r=!0}),{once:!0});return function(){clearTimeout(i),o()}}function o(e,t,n,o){var u,s,l;null==n&&(u=e,s=(0,r.Z)(u,"transitionDuration")||"",l=-1===s.indexOf("ms")?1e3:1,n=parseFloat(s)*l||0);var c=i(e,n,o),f=(0,a.Z)(e,"transitionend",t);return function(){c(),f()}}function u(e,t){var n=(0,r.Z)(e,t)||"",a=-1===n.indexOf("ms")?1e3:1;return parseFloat(n)*a}function s(e,t){var n=u(e,"transitionDuration"),r=u(e,"transitionDelay"),a=o(e,(function(n){n.target===e&&(a(),t(n))}),n+r)}},6861:function(e,t,n){"use strict";function r(e){e.offsetHeight}n.d(t,{Z:function(){return r}})},6927:function(e,t,n){"use strict";n.d(t,{cn:function(){return d},d0:function(){return f},Wj:function(){return c},Ix:function(){return v},ZP:function(){return E}});var r=n(9756),a=n(1788),i=n(7294),o=n(3935),u=!1,s=i.createContext(null),l="unmounted",c="exited",f="entering",d="entered",v="exiting",p=function(e){function t(t,n){var r;r=e.call(this,t,n)||this;var a,i=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?i?(a=c,r.appearStatus=f):a=d:a=t.unmountOnExit||t.mountOnEnter?l:c,r.state={status:a},r.nextCallback=null,r}(0,a.Z)(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&t.status===l?{status:c}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?n!==f&&n!==d&&(t=f):n!==f&&n!==d||(t=v)}this.updateStatus(!1,t)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!=typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},n.updateStatus=function(e,t){void 0===e&&(e=!1),null!==t?(this.cancelNextCallback(),t===f?this.performEnter(e):this.performExit()):this.props.unmountOnExit&&this.state.status===c&&this.setState({status:l})},n.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,a=this.props.nodeRef?[r]:[o.findDOMNode(this),r],i=a[0],s=a[1],l=this.getTimeouts(),c=r?l.appear:l.enter;!e&&!n||u?this.safeSetState({status:d},(function(){t.props.onEntered(i)})):(this.props.onEnter(i,s),this.safeSetState({status:f},(function(){t.props.onEntering(i,s),t.onTransitionEnd(c,(function(){t.safeSetState({status:d},(function(){t.props.onEntered(i,s)}))}))})))},n.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:o.findDOMNode(this);t&&!u?(this.props.onExit(r),this.safeSetState({status:v},(function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,(function(){e.safeSetState({status:c},(function(){e.props.onExited(r)}))}))}))):this.safeSetState({status:c},(function(){e.props.onExited(r)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},n.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:o.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var a=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],i=a[0],u=a[1];this.props.addEndListener(i,u)}null!=e&&setTimeout(this.nextCallback,e)}else setTimeout(this.nextCallback,0)},n.render=function(){var e=this.state.status;if(e===l)return null;var t=this.props,n=t.children,a=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,(0,r.Z)(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return i.createElement(s.Provider,{value:null},"function"==typeof n?n(e,a):i.cloneElement(i.Children.only(n),a))},t}(i.Component);function m(){}p.contextType=s,p.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:m,onEntering:m,onEntered:m,onExit:m,onExiting:m,onExited:m},p.UNMOUNTED=l,p.EXITED=c,p.ENTERING=f,p.ENTERED=d,p.EXITING=v;var E=p},6739:function(e,t,n){"use strict";n.d(t,{Ch:function(){return s}});var r=n(2122),a=n(9756),i=n(7294);n(1143);function o(e){return"default"+e.charAt(0).toUpperCase()+e.substr(1)}function u(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}function s(e,t){return Object.keys(t).reduce((function(n,s){var l,c=n,f=c[o(s)],d=c[s],v=(0,a.Z)(c,[o(s),s].map(u)),p=t[s],m=function(e,t,n){var r=(0,i.useRef)(void 0!==e),a=(0,i.useState)(t),o=a[0],u=a[1],s=void 0!==e,l=r.current;return r.current=s,!s&&l&&o!==t&&u(t),[s?e:o,(0,i.useCallback)((function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];n&&n.apply(void 0,[e].concat(r)),u(e)}),[n])]}(d,f,e[p]),E=m[0],h=m[1];return(0,r.Z)({},v,((l={})[s]=E,l[p]=h,l))}),e)}n(3639)},3164:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7216);function a(e,t){return function(e){var t=(0,r.Z)(e);return t&&t.defaultView||window}(e).getComputedStyle(e,t)}var i=/([A-Z])/g;var o=/^ms-/;function u(e){return function(e){return e.replace(i,"-$1").toLowerCase()}(e).replace(o,"-ms-")}var s=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;var l=function(e,t){var n="",r="";if("string"==typeof t)return e.style.getPropertyValue(u(t))||a(e).getPropertyValue(u(t));Object.keys(t).forEach((function(a){var i=t[a];i||0===i?!function(e){return!(!e||!s.test(e))}(a)?n+=u(a)+": "+i+";":r+=a+"("+i+") ":e.style.removeProperty(u(a))})),r&&(n+="transform: "+r+";"),e.style.cssText+=";"+n}},4302:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=!("undefined"==typeof window||!window.document||!window.document.createElement),a=!1,i=!1;try{var o={get passive(){return a=!0},get once(){return i=a=!0}};r&&(window.addEventListener("test",o,o),window.removeEventListener("test",o,!0))}catch(c){}var u=function(e,t,n,r){if(r&&"boolean"!=typeof r&&!i){var o=r.once,u=r.capture,s=n;!i&&o&&(s=n.__once||function e(r){this.removeEventListener(t,e,u),n.call(this,r)},n.__once=s),e.addEventListener(t,s,a?r:u)}e.addEventListener(t,n,r)};var s=function(e,t,n,r){var a=r&&"boolean"!=typeof r?r.capture:r;e.removeEventListener(t,n,a),n.__once&&e.removeEventListener(t,n.__once,a)};var l=function(e,t,n,r){return u(e,t,n,r),function(){s(e,t,n,r)}}},7216:function(e,t,n){"use strict";function r(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return r}})},4026:function(e,t,n){"use strict";n.d(t,{Z:function(){return G}});var r=n(7294),a=n(5444),i=n(2122),o=n(9756),u=n(9931),s=n.n(u),l=n(6739),c=n(2665),f=n(9385),d=["bsPrefix","className","as"],v=r.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,u=e.as,l=(0,o.Z)(e,d);n=(0,f.vE)(n,"navbar-brand");var c=u||(l.href?"a":"span");return r.createElement(c,(0,i.Z)({},l,{ref:t,className:s()(a,n)}))}));v.displayName="NavbarBrand";var p,m=v,E=n(3164),h=n(6927),x=n(473),b=n(3656),y=n(6861),g=["onEnter","onEntering","onEntered","onExit","onExiting","className","children","dimension","getDimensionValue"],Z={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function N(e,t){var n=t["offset"+e[0].toUpperCase()+e.slice(1)],r=Z[e];return n+parseInt((0,E.Z)(t,r[0]),10)+parseInt((0,E.Z)(t,r[1]),10)}var C=((p={})[h.Wj]="collapse",p[h.Ix]="collapsing",p[h.d0]="collapsing",p[h.cn]="collapse show",p),k={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,getDimensionValue:N},w=r.forwardRef((function(e,t){var n=e.onEnter,a=e.onEntering,u=e.onEntered,l=e.onExit,c=e.onExiting,f=e.className,d=e.children,v=e.dimension,p=void 0===v?"height":v,m=e.getDimensionValue,E=void 0===m?N:m,Z=(0,o.Z)(e,g),k="function"==typeof p?p():p,w=(0,r.useMemo)((function(){return(0,b.Z)((function(e){e.style[k]="0"}),n)}),[k,n]),P=(0,r.useMemo)((function(){return(0,b.Z)((function(e){var t="scroll"+k[0].toUpperCase()+k.slice(1);e.style[k]=e[t]+"px"}),a)}),[k,a]),S=(0,r.useMemo)((function(){return(0,b.Z)((function(e){e.style[k]=null}),u)}),[k,u]),O=(0,r.useMemo)((function(){return(0,b.Z)((function(e){e.style[k]=E(k,e)+"px",(0,y.Z)(e)}),l)}),[l,E,k]),T=(0,r.useMemo)((function(){return(0,b.Z)((function(e){e.style[k]=null}),c)}),[k,c]);return r.createElement(h.ZP,(0,i.Z)({ref:t,addEndListener:x.Z},Z,{"aria-expanded":Z.role?Z.in:null,onEnter:w,onEntering:P,onEntered:S,onExit:O,onExiting:T}),(function(e,t){return r.cloneElement(d,(0,i.Z)({},t,{className:s()(f,d.props.className,C[e],"width"===k&&"width")}))}))}));w.defaultProps=k;var P=w,S=n(8852),O=["children","bsPrefix"],T=r.forwardRef((function(e,t){var n=e.children,a=e.bsPrefix,u=(0,o.Z)(e,O);return a=(0,f.vE)(a,"navbar-collapse"),r.createElement(S.Z.Consumer,null,(function(e){return r.createElement(P,(0,i.Z)({in:!(!e||!e.expanded)},u),r.createElement("div",{ref:t,className:a},n))}))}));T.displayName="NavbarCollapse";var L=T,R=n(3112),D=["bsPrefix","className","children","label","as","onClick"],K=r.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,u=e.children,l=e.label,c=e.as,d=void 0===c?"button":c,v=e.onClick,p=(0,o.Z)(e,D);n=(0,f.vE)(n,"navbar-toggler");var m=(0,r.useContext)(S.Z)||{},E=m.onToggle,h=m.expanded,x=(0,R.Z)((function(e){v&&v(e),E&&E()}));return"button"===d&&(p.type="button"),r.createElement(d,(0,i.Z)({},p,{ref:t,onClick:x,"aria-label":l,className:s()(a,n,!h&&"collapsed")}),u||r.createElement("span",{className:n+"-icon"}))}));K.displayName="NavbarToggle",K.defaultProps={label:"Toggle navigation"};var M=K,j=n(3342),A=["bsPrefix","expand","variant","bg","fixed","sticky","className","children","as","expanded","onToggle","onSelect","collapseOnSelect"],I=(0,c.Z)("navbar-text",{Component:"span"}),_=r.forwardRef((function(e,t){var n=(0,l.Ch)(e,{expanded:"onToggle"}),a=n.bsPrefix,u=n.expand,c=n.variant,d=n.bg,v=n.fixed,p=n.sticky,m=n.className,E=n.children,h=n.as,x=void 0===h?"nav":h,b=n.expanded,y=n.onToggle,g=n.onSelect,Z=n.collapseOnSelect,N=(0,o.Z)(n,A),C=(0,f.vE)(a,"navbar"),k=(0,r.useCallback)((function(){g&&g.apply(void 0,arguments),Z&&b&&y&&y(!1)}),[g,Z,b,y]);void 0===N.role&&"nav"!==x&&(N.role="navigation");var w=C+"-expand";"string"==typeof u&&(w=w+"-"+u);var P=(0,r.useMemo)((function(){return{onToggle:function(){return y&&y(!b)},bsPrefix:C,expanded:!!b}}),[C,b,y]);return r.createElement(S.Z.Provider,{value:P},r.createElement(j.Z.Provider,{value:k},r.createElement(x,(0,i.Z)({ref:t},N,{className:s()(m,C,u&&w,c&&C+"-"+c,d&&"bg-"+d,p&&"sticky-"+p,v&&"fixed-"+v)}),E)))}));_.defaultProps={expand:!0,variant:"light",collapseOnSelect:!1},_.displayName="Navbar",_.Brand=m,_.Toggle=M,_.Collapse=L,_.Text=I;var U=_,F=["bsPrefix","fluid","as","className"],V=r.forwardRef((function(e,t){var n=e.bsPrefix,a=e.fluid,u=e.as,l=void 0===u?"div":u,c=e.className,d=(0,o.Z)(e,F),v=(0,f.vE)(n,"container"),p="string"==typeof a?"-"+a:"-fluid";return r.createElement(l,(0,i.Z)({ref:t},d,{className:s()(c,a?""+v+p:v)}))}));V.displayName="Container",V.defaultProps={fluid:!1};var B=V,H=n(8429),q=n(8173),W=n.n(q),X="navbar-module--customNavbarLinks--3kDzl",G=function(){return r.createElement(U,{bg:"light",expand:"lg",className:"navbar-module--customNavbar--3o4Gk"},r.createElement(B,{fluid:!0},r.createElement(U.Brand,{as:"div"},r.createElement(a.Link,{to:"/"},r.createElement(W(),null))),r.createElement(U.Toggle,{"aria-controls":"basic-navbar-nav"}),r.createElement(U.Collapse,{id:"basic-navbar-nav"},r.createElement(H.Z,{className:"w-100 justify-content-end"},r.createElement(a.Link,{className:X,to:"/"},"Home"),r.createElement(a.Link,{className:X,to:"/tool"},"Tool"),r.createElement(a.Link,{className:X,to:"/submit"},"submit"),r.createElement(a.Link,{className:X,to:"/about"},"about")))))}},8173:function(e,t,n){var r=n(7294);function a(e){return r.createElement("svg",e,[r.createElement("path",{d:"M2 2L25 25V2L2 25H25",fill:"#FAFAFA",key:0}),r.createElement("path",{d:"M2 2L25 25V2L2 25H25",stroke:"black",strokeWidth:"3",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round",key:1})])}a.defaultProps={width:"27",height:"27",viewBox:"0 0 27 27",fill:"none"},e.exports=a,a.default=a},2473:function(e){"use strict";var t=function(){};e.exports=t}}]);
//# sourceMappingURL=81c7c4f87996ee8daa78ea5324fefcd7233fafa9-3c596338b26f462cdd11.js.map
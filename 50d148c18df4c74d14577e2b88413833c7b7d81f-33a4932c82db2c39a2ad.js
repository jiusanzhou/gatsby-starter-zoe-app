(self.webpackChunkgatsby_starter_zoe_app=self.webpackChunkgatsby_starter_zoe_app||[]).push([[332],{87757:function(e,t,r){e.exports=r(35666)},32993:function(e){"use strict";var t=Array.isArray,r=Object.keys,n=Object.prototype.hasOwnProperty,o="undefined"!=typeof Element;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){var c,l,u,s=t(e),f=t(a);if(s&&f){if((l=e.length)!=a.length)return!1;for(c=l;0!=c--;)if(!i(e[c],a[c]))return!1;return!0}if(s!=f)return!1;var p=e instanceof Date,d=a instanceof Date;if(p!=d)return!1;if(p&&d)return e.getTime()==a.getTime();var E=e instanceof RegExp,T=a instanceof RegExp;if(E!=T)return!1;if(E&&T)return e.toString()==a.toString();var h=r(e);if((l=h.length)!==r(a).length)return!1;for(c=l;0!=c--;)if(!n.call(a,h[c]))return!1;if(o&&e instanceof Element&&a instanceof Element)return e===a;for(c=l;0!=c--;)if(!("_owner"===(u=h[c])&&e.$$typeof||i(e[u],a[u])))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return i(e,t)}catch(r){if(r.message&&r.message.match(/stack|recursion/i)||-2146828260===r.number)return console.warn("Warning: react-fast-compare does not handle circular references.",r.name,r.message),!1;throw r}}},7701:function(e,t,r){var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=f(r(67294)),a=f(r(45697)),c=f(r(24839)),l=f(r(32993)),u=r(31640),s=r(70286);function f(e){return e&&e.__esModule?e:{default:e}}function p(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var T,h,m,y=(0,c.default)(u.reducePropsToState,u.handleClientStateChange,u.mapStateOnServer)((function(){return null})),g=(T=y,m=h=function(e){function t(){return d(this,t),E(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!(0,l.default)(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case s.TAG_NAMES.SCRIPT:case s.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case s.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,o=e.arrayTypeChildren,i=e.newChildProps,a=e.nestedChildren;return n({},o,((t={})[r.type]=[].concat(o[r.type]||[],[n({},i,this.mapNestedChildrenToProps(r,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,o=e.child,i=e.newProps,a=e.newChildProps,c=e.nestedChildren;switch(o.type){case s.TAG_NAMES.TITLE:return n({},i,((t={})[o.type]=c,t.titleAttributes=n({},a),t));case s.TAG_NAMES.BODY:return n({},i,{bodyAttributes:n({},a)});case s.TAG_NAMES.HTML:return n({},i,{htmlAttributes:n({},a)})}return n({},i,((r={})[o.type]=n({},a),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=n({},t);return Object.keys(e).forEach((function(t){var o;r=n({},r,((o={})[t]=e[t],o))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return i.default.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,a=p(o,["children"]),c=(0,u.convertReactPropstoHtmlAttributes)(a);switch(r.warnOnInvalidChildren(e,i),e.type){case s.TAG_NAMES.LINK:case s.TAG_NAMES.META:case s.TAG_NAMES.NOSCRIPT:case s.TAG_NAMES.SCRIPT:case s.TAG_NAMES.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:c,nestedChildren:i});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:c,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=p(e,["children"]),o=n({},r);return t&&(o=this.mapChildrenToProps(t,o)),i.default.createElement(T,o)},o(t,null,[{key:"canUseDOM",set:function(e){T.canUseDOM=e}}]),t}(i.default.Component),h.propTypes={base:a.default.object,bodyAttributes:a.default.object,children:a.default.oneOfType([a.default.arrayOf(a.default.node),a.default.node]),defaultTitle:a.default.string,defer:a.default.bool,encodeSpecialCharacters:a.default.bool,htmlAttributes:a.default.object,link:a.default.arrayOf(a.default.object),meta:a.default.arrayOf(a.default.object),noscript:a.default.arrayOf(a.default.object),onChangeClientState:a.default.func,script:a.default.arrayOf(a.default.object),style:a.default.arrayOf(a.default.object),title:a.default.string,titleAttributes:a.default.object,titleTemplate:a.default.string},h.defaultProps={defer:!0,encodeSpecialCharacters:!0},h.peek=T.peek,h.rewind=function(){var e=T.rewind();return e||(e=(0,u.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},m);g.renderStatic=g.rewind,t.ZP=g},70286:function(e,t){t.__esModule=!0;t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var r=t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},n=(t.VALID_TAG_NAMES=Object.keys(r).map((function(e){return r[e]})),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(n).reduce((function(e,t){return e[n[t]]=t,e}),{}),t.SELF_CLOSING_TAGS=[r.NOSCRIPT,r.SCRIPT,r.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},31640:function(e,t,r){t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=l(r(67294)),a=l(r(46494)),c=r(70286);function l(e){return e&&e.__esModule?e:{default:e}}var u,s=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},f=function(e){var t=h(e,c.TAG_NAMES.TITLE),r=h(e,c.HELMET_PROPS.TITLE_TEMPLATE);if(r&&t)return r.replace(/%s/g,(function(){return t}));var n=h(e,c.HELMET_PROPS.DEFAULT_TITLE);return t||n||void 0},p=function(e){return h(e,c.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},d=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return o({},e,t)}),{})},E=function(e,t){return t.filter((function(e){return void 0!==e[c.TAG_NAMES.BASE]})).map((function(e){return e[c.TAG_NAMES.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var i=n[o].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}return t}),[])},T=function(e,t,r){var o={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&A("Helmet: "+e+' should be of type "Array". Instead found type "'+n(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var n={};r.filter((function(e){for(var r=void 0,i=Object.keys(e),a=0;a<i.length;a++){var l=i[a],u=l.toLowerCase();-1===t.indexOf(u)||r===c.TAG_PROPERTIES.REL&&"canonical"===e[r].toLowerCase()||u===c.TAG_PROPERTIES.REL&&"stylesheet"===e[u].toLowerCase()||(r=u),-1===t.indexOf(l)||l!==c.TAG_PROPERTIES.INNER_HTML&&l!==c.TAG_PROPERTIES.CSS_TEXT&&l!==c.TAG_PROPERTIES.ITEM_PROP||(r=l)}if(!r||!e[r])return!1;var s=e[r].toLowerCase();return o[r]||(o[r]={}),n[r]||(n[r]={}),!o[r][s]&&(n[r][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(n),l=0;l<i.length;l++){var u=i[l],s=(0,a.default)({},o[u],n[u]);o[u]=s}return e}),[]).reverse()},h=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},m=(u=Date.now(),function(e){var t=Date.now();t-u>16?(u=t,e(t)):setTimeout((function(){m(e)}),0)}),y=function(e){return clearTimeout(e)},g="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||m:r.g.requestAnimationFrame||m,v="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||y:r.g.cancelAnimationFrame||y,A=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},b=null,S=function(e,t){var r=e.baseTag,n=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,l=e.noscriptTags,u=e.onChangeClientState,s=e.scriptTags,f=e.styleTags,p=e.title,d=e.titleAttributes;O(c.TAG_NAMES.BODY,n),O(c.TAG_NAMES.HTML,o),w(p,d);var E={baseTag:P(c.TAG_NAMES.BASE,r),linkTags:P(c.TAG_NAMES.LINK,i),metaTags:P(c.TAG_NAMES.META,a),noscriptTags:P(c.TAG_NAMES.NOSCRIPT,l),scriptTags:P(c.TAG_NAMES.SCRIPT,s),styleTags:P(c.TAG_NAMES.STYLE,f)},T={},h={};Object.keys(E).forEach((function(e){var t=E[e],r=t.newTags,n=t.oldTags;r.length&&(T[e]=r),n.length&&(h[e]=E[e].oldTags)})),t&&t(),u(e,T,h)},_=function(e){return Array.isArray(e)?e.join(""):e},w=function(e,t){void 0!==e&&document.title!==e&&(document.title=_(e)),O(c.TAG_NAMES.TITLE,t)},O=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(c.HELMET_ATTRIBUTE),o=n?n.split(","):[],i=[].concat(o),a=Object.keys(t),l=0;l<a.length;l++){var u=a[l],s=t[u]||"";r.getAttribute(u)!==s&&r.setAttribute(u,s),-1===o.indexOf(u)&&o.push(u);var f=i.indexOf(u);-1!==f&&i.splice(f,1)}for(var p=i.length-1;p>=0;p--)r.removeAttribute(i[p]);o.length===i.length?r.removeAttribute(c.HELMET_ATTRIBUTE):r.getAttribute(c.HELMET_ATTRIBUTE)!==a.join(",")&&r.setAttribute(c.HELMET_ATTRIBUTE,a.join(","))}},P=function(e,t){var r=document.head||document.querySelector(c.TAG_NAMES.HEAD),n=r.querySelectorAll(e+"["+c.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(n),i=[],a=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===c.TAG_PROPERTIES.INNER_HTML)r.innerHTML=t.innerHTML;else if(n===c.TAG_PROPERTIES.CSS_TEXT)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var l=void 0===t[n]?"":t[n];r.setAttribute(n,l)}r.setAttribute(c.HELMET_ATTRIBUTE,"true"),o.some((function(e,t){return a=t,r.isEqualNode(e)}))?o.splice(a,1):i.push(r)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return r.appendChild(e)})),{oldTags:o,newTags:i}},R=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},M=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[c.REACT_TAG_MAP[r]||r]=e[r],t}),t)},L=function(e,t,r){switch(e){case c.TAG_NAMES.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[c.HELMET_ATTRIBUTE]=!0,o=M(r,n),[i.default.createElement(c.TAG_NAMES.TITLE,o,e)];var e,r,n,o},toString:function(){return function(e,t,r,n){var o=R(r),i=_(t);return o?"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+o+">"+s(i,n)+"</"+e+">":"<"+e+" "+c.HELMET_ATTRIBUTE+'="true">'+s(i,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case c.ATTRIBUTE_NAMES.BODY:case c.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return M(t)},toString:function(){return R(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,o=((n={key:r})[c.HELMET_ATTRIBUTE]=!0,n);return Object.keys(t).forEach((function(e){var r=c.REACT_TAG_MAP[e]||e;if(r===c.TAG_PROPERTIES.INNER_HTML||r===c.TAG_PROPERTIES.CSS_TEXT){var n=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=t[e]})),i.default.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var o=Object.keys(n).filter((function(e){return!(e===c.TAG_PROPERTIES.INNER_HTML||e===c.TAG_PROPERTIES.CSS_TEXT)})).reduce((function(e,t){var o=void 0===n[t]?t:t+'="'+s(n[t],r)+'"';return e?e+" "+o:o}),""),i=n.innerHTML||n.cssText||"",a=-1===c.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+o+(a?"/>":">"+i+"</"+e+">")}),"")}(e,t,r)}}}};t.convertReactPropstoHtmlAttributes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[c.HTML_TAG_MAP[r]||r]=e[r],t}),t)},t.handleClientStateChange=function(e){b&&v(b),e.defer?b=g((function(){S(e,(function(){b=null}))})):(S(e),b=null)},t.mapStateOnServer=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,l=e.noscriptTags,u=e.scriptTags,s=e.styleTags,f=e.title,p=void 0===f?"":f,d=e.titleAttributes;return{base:L(c.TAG_NAMES.BASE,t,n),bodyAttributes:L(c.ATTRIBUTE_NAMES.BODY,r,n),htmlAttributes:L(c.ATTRIBUTE_NAMES.HTML,o,n),link:L(c.TAG_NAMES.LINK,i,n),meta:L(c.TAG_NAMES.META,a,n),noscript:L(c.TAG_NAMES.NOSCRIPT,l,n),script:L(c.TAG_NAMES.SCRIPT,u,n),style:L(c.TAG_NAMES.STYLE,s,n),title:L(c.TAG_NAMES.TITLE,{title:p,titleAttributes:d},n)}},t.reducePropsToState=function(e){return{baseTag:E([c.TAG_PROPERTIES.HREF],e),bodyAttributes:d(c.ATTRIBUTE_NAMES.BODY,e),defer:h(e,c.HELMET_PROPS.DEFER),encode:h(e,c.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:d(c.ATTRIBUTE_NAMES.HTML,e),linkTags:T(c.TAG_NAMES.LINK,[c.TAG_PROPERTIES.REL,c.TAG_PROPERTIES.HREF],e),metaTags:T(c.TAG_NAMES.META,[c.TAG_PROPERTIES.NAME,c.TAG_PROPERTIES.CHARSET,c.TAG_PROPERTIES.HTTPEQUIV,c.TAG_PROPERTIES.PROPERTY,c.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:T(c.TAG_NAMES.NOSCRIPT,[c.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:T(c.TAG_NAMES.SCRIPT,[c.TAG_PROPERTIES.SRC,c.TAG_PROPERTIES.INNER_HTML],e),styleTags:T(c.TAG_NAMES.STYLE,[c.TAG_PROPERTIES.CSS_TEXT],e),title:f(e),titleAttributes:d(c.ATTRIBUTE_NAMES.TITLE,e)}},t.requestAnimationFrame=g,t.warn=A},24839:function(e,t,r){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var o=r(67294),i=n(o),a=n(r(36872));function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var l=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var u,s=[];function f(){u=e(s.map((function(e){return e.props}))),p.canUseDOM?t(u):r&&(u=r(u))}var p=function(e){var t,r;function o(){return e.apply(this,arguments)||this}r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,o.peek=function(){return u},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=u;return u=void 0,s=[],e};var c=o.prototype;return c.shouldComponentUpdate=function(e){return!a(e,this.props)},c.componentWillMount=function(){s.push(this),f()},c.componentDidUpdate=function(){f()},c.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),f()},c.render=function(){return i.createElement(n,this.props)},o}(o.Component);return c(p,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),c(p,"canUseDOM",l),p}}},36872:function(e){e.exports=function(e,t,r,n){var o=r?r.call(n,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(t),l=0;l<i.length;l++){var u=i[l];if(!c(u))return!1;var s=e[u],f=t[u];if(!1===(o=r?r.call(n,s,f,u):void 0)||void 0===o&&s!==f)return!1}return!0}},33853:function(e,t,r){"use strict";r.d(t,{Z:function(){return $}});var n=r(19756),o=r(67294),i=r(57690),a=r(7701),c=function(e){var t=e.description,r=e.lang,n=e.meta,i=e.title,c=e.titleTemplate,l=e.author;return o.createElement(a.ZP,{htmlAttributes:{lang:r},title:i,titleTemplate:c,meta:[{name:"description",content:t},{property:"og:title",content:i},{property:"og:description",content:t},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l},{name:"twitter:title",content:i},{name:"twitter:description",content:t}].concat(n)})};c.defaultProps={lang:"en",meta:[],description:""};var l=c,u=r(39235),s=function(e){var t=e.description,r=e.meta,n=e.title,i=(0,u.$)();return o.createElement(l,{lang:i.lang,title:n||i.title,titleTemplate:"%s | "+i.title,meta:r,description:t||i.description})},f=r(95230),p=r(17361),d=r(15759),E=function(e){var t=Object.assign({},e),r=(0,u.$)(),n=r.title,i=r.logo,a=r.version,c=r.description,l=r.primaryColor;return o.createElement(p.k,{w:"fit-content"},o.createElement(d.default,Object.assign({name:n,description:c,img:i,sup:a,colorScheme:l},t)))},T=r(92332),h=r(57556),m=r(48374),y=function(e){var t=Object.assign({},e),r=(0,f.useColorMode)(),n=r.colorMode,i=r.toggleColorMode;return o.createElement(T.h,Object.assign({rounded:"full",color:"light"===n?"black":"white"},t,{onClick:i,icon:"light"===n?o.createElement(h.k,null):o.createElement(m.N,null)}))},g=r(5118),v=r(2316),A=r(67462),b=r(52200),S=r(71319),_=r(50132),w=r(41051),O=r(21202),P=r(17622),R=r(53713),M=r(96721),L=["navs"],C=["navs"],I=function(e){var t=e.navs,r=void 0===t?[]:t,a=(0,n.Z)(e,L),c=(0,f.useColorMode)().colorMode;return o.createElement(p.k,a,r.map((function(e,t){var r=e.title,n=e.href,a=e.items;return a&&0!==a.length?o.createElement(p.k,{mx:".6rem",key:t},o.createElement(S.J2,{trigger:"hover"},o.createElement(S.xo,null,o.createElement(p.k,{fontWeight:"bold",role:"group",alignItems:"center"},n?o.createElement(M.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(b.x,null,r),o.createElement(_.J,{as:g.v,ml:".2rem",_groupHover:{transform:"rotate( -180deg )",transition:"all 0.2s ease-out"}}))),o.createElement(S.yk,{style:{width:"var(--chakra-sizes-lg)"}},o.createElement(S.QH,null),o.createElement(S.b,{style:{width:"var(--chakra-sizes-lg)"}},o.createElement(w.M,{columns:2,spacing:4},a.map((function(e,t){var r=e.title,n=e.description,a=e.href,l=e.icon,u=e.color;return o.createElement(p.k,{key:t},o.createElement(M.Z,{pure:!0,href:a,_hover:{textDecoration:"none"},w:"100%"},o.createElement(p.k,{w:"100%",key:t,p:"2",borderRadius:".5rem",transition:"all .3s ease-in-out",_hover:{bg:(u||R.O[t%R.O.length]||"gray")+"."+("light"===c?"100":"700")}},o.createElement(O.qE,{mr:".5rem",size:"xs",src:l,name:r}),o.createElement(i.xu,null,o.createElement(b.x,{fontSize:"1rem",fontWeight:"bold"},r),o.createElement(b.x,{fontSize:".8rem",color:(0,f.useColorModeValue)("gray.700","gray.200")},n)))))}))))))):o.createElement(p.k,{fontWeight:"bold",mx:".6rem",key:t},n?o.createElement(M.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(b.x,null,r))})))},x=function(e){var t=e.navs,r=void 0===t?[]:t,i=(0,n.Z)(e,C),a=(0,o.useState)(!1),c=a[0],l=a[1],u=function(){return l(!c)};return o.createElement(S.J2,Object.assign({trigger:"click",onOpen:u,onClose:u},i),o.createElement(S.xo,null,o.createElement(T.h,{borderRadius:"full",display:i.display,transition:"all .3s ease-in-out",icon:c?o.createElement(v.D,null):o.createElement(A.U,null)})),o.createElement(S.yk,{display:i.display,h:"100vh",sx:{width:"100vw",overflow:"auto"}},o.createElement(S.b,null,o.createElement(P.gC,{my:"5",alignItems:"flex-start",spacing:5},r.map((function(e,t){var r=e.title,n=e.href,i=e.items;return i&&0!==i.length?o.createElement(p.k,{mx:".6rem",key:t,flexDir:"column"},o.createElement(p.k,{fontWeight:"bold"},n?o.createElement(M.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(b.x,null,r)),o.createElement(P.gC,{mt:"1rem",ml:"1rem",alignItems:"flex-start"},i.map((function(e,t){var r=e.title,n=(e.description,e.href,e.icon);e.color;return o.createElement(p.k,{key:t},o.createElement(O.qE,{mr:".5rem",size:"xs",src:n,name:r}),o.createElement(b.x,{fontSize:".875rem"},r))})))):o.createElement(p.k,{fontWeight:"bold",mx:".6rem",key:t},n?o.createElement(M.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(b.x,null,r))}))))))},N=function(e){return o.createElement(p.k,{alignItems:"center",mr:"1rem"},o.createElement(I,Object.assign({display:["none","none","none","flex"]},e)),o.createElement(x,Object.assign({display:["flex","flex","flex","none"]},e)))},k=function(e){var t=(0,u.$)().navs;return o.createElement(N,Object.assign({navs:t},e))},G=["children","border","fixed","wraperBg","logoProps"],j=function(e){e.children;var t,r=e.border,i=e.fixed,a=e.wraperBg,c=e.logoProps,l=(0,n.Z)(e,G),u=(0,f.useColorMode)().colorMode;return o.createElement(p.k,((t={as:"header",w:"100%",position:i?"fixed":null,top:"0",borderBottomWidth:r?"1px":"0",bg:a,zIndex:"9999"}).bg="light"===u?"var(--chakra-colors-white)":"var(--chakra-colors-gray-800)",t),o.createElement(p.k,Object.assign({h:["3em","3.5em","4em","4.5em"],left:"0",right:"0",top:"0",px:["1em","0","0","0"],margin:"0 auto",alignItems:"center"},l),o.createElement(E,c),o.createElement(p.k,{flex:"1",justifyContent:"flex-end"},o.createElement(k,null),o.createElement(y,null))))},H=r(59075),B=r(38967),U=r(62161),D=r(51900),F=["children","disableBorder","disableGotop","disableLogo","disableSocials","disableLinks","logoProps"],Y=function(e){var t=e.children,r=e.disableBorder,a=e.disableGotop,c=e.disableLogo,l=e.disableSocials,s=e.disableLinks,f=e.logoProps,p=void 0===f?{}:f,d=(0,n.Z)(e,F),T=(0,u.$)(),h=T.copyright,m=T.primaryColor,y=T.author,g=T.links,v=void 0===g?[]:g,A=T.socials,b=void 0===A?{}:A;return o.createElement(i.xu,{w:"100%",borderTopStyle:"solid",borderTopWidth:r?"0":"1px"},o.createElement(i.xu,Object.assign({left:"0",right:"0",top:"0",px:["1em","0","0","0"],pt:"2rem",pb:"1rem",margin:"0 auto",position:"relative",borderTopStyle:"solid"},d),!a&&o.createElement(B.default,{colorScheme:m}),t,o.createElement(w.M,{w:"100%",mt:[".5rem",".7rem",".7rem","1rem"],columns:[1,1,3,4],spacing:"1rem"},o.createElement(i.xu,null,!c&&o.createElement(E,Object.assign({expend:!0},p)),!l&&o.createElement(H.d,{mt:"1rem",socials:b})),!s&&o.createElement(U.default,{links:v})),o.createElement(D.default,{flexWrap:"wrap",mt:"2rem",copyright:h,author:y})))},q=r(12724),W=["title","description","header","footer","fixed","children","extendFooter"],Z=(0,u.$)().maxWidth,z=void 0===Z?["100%","80%","80%","80%","60rem"]:Z,$=function(e){var t=e.title,r=e.description,a=e.header,c=void 0===a?{}:a,l=e.footer,u=void 0===l?{}:l,f=e.fixed,p=void 0===f||f,d=e.children,E=e.extendFooter,T=((0,n.Z)(e,W),Array.isArray(z)?z:["100%","80%","80%","80%",z]);return o.createElement(q.Mp,{minH:"calc(100vh)"},o.createElement(s,{title:t,description:r,meta:[{name:"viewport",content:"width=device-width, initial-scale=1.0, minimum-scale=1.0"}]}),o.createElement(j,Object.assign({fixed:p,w:T},c)),o.createElement(i.xu,{as:"main",pt:p?["3em","3.5em","4em","4.5em"]:null},d),o.createElement(Y,Object.assign({w:T},u),E))}},53713:function(e,t,r){"use strict";r.d(t,{O:function(){return n},Y:function(){return o}});var n=["green","teal","blue","red","orange","yellow","cyan","purple","pink"],o=function(e){return n[e%n.length]}},35666:function(e){var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(C){l=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var o=t&&t.prototype instanceof h?t:h,i=Object.create(o.prototype),a=new R(n||[]);return i._invoke=function(e,t,r){var n=f;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===E){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=w(a,r);if(c){if(c===T)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=E,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var l=s(e,t,r);if("normal"===l.type){if(n=r.done?E:p,l.arg===T)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=E,r.method="throw",r.arg=l.arg)}}}(e,r,a),i}function s(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(C){return{type:"throw",arg:C}}}e.wrap=u;var f="suspendedStart",p="suspendedYield",d="executing",E="completed",T={};function h(){}function m(){}function y(){}var g={};g[i]=function(){return this};var v=Object.getPrototypeOf,A=v&&v(v(M([])));A&&A!==r&&n.call(A,i)&&(g=A);var b=y.prototype=h.prototype=Object.create(g);function S(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function _(e,t){function r(o,i,a,c){var l=s(e[o],e,i);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,a,c)}),(function(e){r("throw",e,a,c)})):t.resolve(f).then((function(e){u.value=e,a(u)}),(function(e){return r("throw",e,a,c)}))}c(l.arg)}var o;this._invoke=function(e,n){function i(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(i,i):i()}}function w(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,w(e,r),"throw"===r.method))return T;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return T}var o=s(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,T;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,T):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,T)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function R(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function M(e){if(e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}return{next:L}}function L(){return{value:t,done:!0}}return m.prototype=b.constructor=y,y.constructor=m,m.displayName=l(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,l(e,c,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},S(_.prototype),_.prototype[a]=function(){return this},e.AsyncIterator=_,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new _(u(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},S(b),l(b,c,"Generator"),b[i]=function(){return this},b.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=M,R.prototype={constructor:R,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(P),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(l&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,T):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),T},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),P(r),T}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:M(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),T}},e}(e.exports);try{regeneratorRuntime=t}catch(r){Function("r","regeneratorRuntime = r")(t)}}}]);
//# sourceMappingURL=50d148c18df4c74d14577e2b88413833c7b7d81f-33a4932c82db2c39a2ad.js.map
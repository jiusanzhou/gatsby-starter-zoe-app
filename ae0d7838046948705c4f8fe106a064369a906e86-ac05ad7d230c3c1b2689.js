(self.webpackChunkgatsby_starter_zoe_app=self.webpackChunkgatsby_starter_zoe_app||[]).push([[366],{48926:function(e){function t(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(s){return void r(s)}l.done?t(c):Promise.resolve(c).then(n,o)}e.exports=function(e){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=e.apply(r,n);function l(e){t(a,o,i,l,c,"next",e)}function c(e){t(a,o,i,l,c,"throw",e)}l(void 0)}))}},e.exports.default=e.exports,e.exports.__esModule=!0},69192:function(e,t,r){"use strict";r.d(t,{Z:function(){return T}});var n=r(96156),o=r(19756),i=r(95230),a=r(14762),l=r(52200),c=r(41051),s=r(17622),m=r(57690),d=r(17361),u=r(67294),p=r(55341),f=r(53713),g=r(9647),h=["title","src","color","p","h"],v=function(e){var t=e.title,r=void 0===t?"":t,n=e.src,l=e.color,c=void 0===l?"white":l,s=e.p,m=void 0===s?2:s,d=e.h,v=void 0===d?["10rem","15rem"]:d,E=(0,o.Z)(e,h),b=(0,f.Y)(r.slice(0).charCodeAt()||0);return n?u.createElement(g.default,Object.assign({h:v,src:n},E)):u.createElement(p.M,Object.assign({bgColor:(0,i.useColorModeValue)(b+".200",b+".700"),h:v,color:c,p:m},E),u.createElement(a.X,{isTruncated:!0,fontWeight:E.fontWeight||"bold",fontSize:E.fontSize||"1rem",textAlign:E.textAlign||"center"},r))},E=r(96721),b=["data"],x=["data"],y=["data"],k=["data"],w=["data"],O=["containerProps","leading","leadingProps","trailing","trailingProps","bodyProps","title","titleProps","description","descriptionProps","subTitle","subTitleProps","type","items"];function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Z=function(e){var t=e.data,r=t.title,n=t.banner,i=(0,o.Z)(e,b);return u.createElement(v,Object.assign({borderRadius:".5rem",title:r,src:n},i))},S=function(e){e.data,(0,o.Z)(e,x);return null},C=function(e){var t=e.data,r=t.title,n=(t.href,(0,o.Z)(e,y));return u.createElement(a.X,Object.assign({isTruncated:!0,as:"h4",fontSize:"1rem"},n),r)},z=function(e){e.data,(0,o.Z)(e,k);return null},_=function(e){var t=e.data.description,r=(0,o.Z)(e,w);return u.createElement(l.x,Object.assign({isTruncated:!0,fontSize:".9rem",color:(0,i.useColorModeValue)("gray.700","gray.200")},r),t)},M={grid:{as:c.M,props:{columns:[1,1,2,3],spacing:10},containerProps:{flexDirection:"column",textAlign:"left"},leadingProps:{},bodyProps:{mt:"2"}},tile:{as:s.gC,props:{spacing:8},containerProps:{flexDirection:"row",textAlign:"left",w:"100%",overflow:"hidden"},leadingProps:{h:["4rem","6rem"],w:["5rem","8rem"],fontSize:[".7rem",".9rem"],mr:5},bodyProps:{flex:1,overflow:"hidden",display:"flex",alignItems:"flex-start",flexDirection:"column"}}},T=function(e){var t=e.containerProps,r=void 0===t?{}:t,n=e.leading,i=void 0===n?Z:n,a=e.leadingProps,l=void 0===a?{}:a,c=e.trailing,s=void 0===c?S:c,p=e.trailingProps,f=void 0===p?{}:p,g=e.bodyProps,h=void 0===g?{}:g,v=e.title,b=void 0===v?C:v,x=e.titleProps,y=void 0===x?{}:x,k=e.description,w=void 0===k?_:k,P=e.descriptionProps,T=void 0===P?{}:P,W=e.subTitle,D=void 0===W?z:W,A=e.subTitleProps,I=void 0===A?{}:A,B=e.type,$=void 0===B?"grid":B,L=e.items,H=void 0===L?[]:L,J=(0,o.Z)(e,O),R=M[$];return R?u.createElement(R.as,j(j({children:H.map((function(e,t){return u.createElement(d.k,Object.assign({key:t},R.containerProps,r),u.createElement(i,j(j({data:e},R.leadingProps),l)),u.createElement(m.xu,Object.assign({},R.bodyProps,h),u.createElement(E.Z,{pure:!0,href:e.href,w:"100%"},u.createElement(b,j(j({data:e},y),{},{isTruncated:"grid"!==$}))),u.createElement(E.Z,{pure:!0,href:e.href,w:"100%"},u.createElement(w,j(j({data:e},T),{},{isTruncated:"grid"!==$}))),u.createElement(D,j({data:e},I))),u.createElement(s,j({data:e},f)))}))},R.props),J)):u.createElement(m.xu,{p:"2",bg:"red",color:"white"},"Uknown view type ",$,"!")}},36055:function(e,t,r){"use strict";r.d(t,{Z:function(){return V}});var n=r(19756),o=r(67294),i=r(57690),a=r(14615),l=r(39235),c=function(e){var t=e.description,r=e.meta,n=e.title,i=(0,l.$)();return o.createElement(a.default,{lang:i.lang,title:n||i.title,titleTemplate:"%s | "+i.title,meta:r,description:t||i.description})},s=r(95230),m=r(17361),d=r(15759),u=function(e){var t=Object.assign({},e),r=(0,l.$)(),n=r.title,i=r.logo,a=r.version,c=r.description,s=r.primaryColor;return o.createElement(m.k,{w:"fit-content"},o.createElement(d.default,Object.assign({name:n,description:c,img:i,sup:a,colorScheme:s},t)))},p=r(38694),f=r(5118),g=r(2316),h=r(67462),v=r(52200),E=r(71319),b=r(50132),x=r(41051),y=r(21202),k=r(92332),w=r(17622),O=r(53713),P=r(96721),j=["navs"],Z=["navs"],S=function(e){var t=e.navs,r=void 0===t?[]:t,a=(0,n.Z)(e,j),l=(0,s.useColorMode)().colorMode;return o.createElement(m.k,a,r.map((function(e,t){var r=e.title,n=e.href,a=e.items;return a&&0!==a.length?o.createElement(m.k,{mx:".6rem",key:t},o.createElement(E.J2,{trigger:"hover"},o.createElement(E.xo,null,o.createElement(m.k,{fontWeight:"bold",role:"group",alignItems:"center"},n?o.createElement(P.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(v.x,null,r),o.createElement(b.J,{as:f.v,ml:".2rem",_groupHover:{transform:"rotate( -180deg )",transition:"all 0.2s ease-out"}}))),o.createElement(E.yk,{style:{width:"var(--chakra-sizes-lg)"}},o.createElement(E.QH,null),o.createElement(E.b,{style:{width:"var(--chakra-sizes-lg)"}},o.createElement(x.M,{columns:2,spacing:4},a.map((function(e,t){var r=e.title,n=e.description,a=e.href,c=e.icon,d=e.color;return o.createElement(m.k,{key:t},o.createElement(P.Z,{pure:!0,href:a,_hover:{textDecoration:"none"},w:"100%"},o.createElement(m.k,{w:"100%",key:t,p:"2",borderRadius:".5rem",transition:"all .3s ease-in-out",_hover:{bg:(d||O.O[t%O.O.length]||"gray")+"."+("light"===l?"100":"700")}},o.createElement(y.qE,{mr:".5rem",size:"xs",src:c,name:r}),o.createElement(i.xu,null,o.createElement(v.x,{fontSize:"1rem",fontWeight:"bold"},r),o.createElement(v.x,{fontSize:".8rem",color:(0,s.useColorModeValue)("gray.700","gray.200")},n)))))}))))))):o.createElement(m.k,{fontWeight:"bold",mx:".6rem",key:t},n?o.createElement(P.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(v.x,null,r))})))},C=function(e){var t=e.navs,r=void 0===t?[]:t,i=(0,n.Z)(e,Z),a=(0,o.useState)(!1),l=a[0],c=a[1],s=function(){return c(!l)};return o.createElement(E.J2,Object.assign({trigger:"click",onOpen:s,onClose:s},i),o.createElement(E.xo,null,o.createElement(k.h,{borderRadius:"full",display:i.display,transition:"all .3s ease-in-out",icon:l?o.createElement(g.D,null):o.createElement(h.U,null)})),o.createElement(E.yk,{display:i.display,h:"100vh",sx:{width:"100vw",overflow:"auto"}},o.createElement(E.b,null,o.createElement(w.gC,{my:"5",alignItems:"flex-start",spacing:5},r.map((function(e,t){var r=e.title,n=e.href,i=e.items;return i&&0!==i.length?o.createElement(m.k,{mx:".6rem",key:t,flexDir:"column"},o.createElement(m.k,{fontWeight:"bold"},n?o.createElement(P.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(v.x,null,r)),o.createElement(w.gC,{mt:"1rem",ml:"1rem",alignItems:"flex-start"},i.map((function(e,t){var r=e.title,n=(e.description,e.href,e.icon);e.color;return o.createElement(m.k,{key:t},o.createElement(y.qE,{mr:".5rem",size:"xs",src:n,name:r}),o.createElement(v.x,{fontSize:".875rem"},r))})))):o.createElement(m.k,{fontWeight:"bold",mx:".6rem",key:t},n?o.createElement(P.Z,{pure:!0,href:n,_hover:{}},r):o.createElement(v.x,null,r))}))))))},z=function(e){return o.createElement(m.k,{alignItems:"center",mr:"1rem"},o.createElement(S,Object.assign({display:["none","none","none","flex"]},e)),o.createElement(C,Object.assign({display:["flex","flex","flex","none"]},e)))},_=function(e){var t=(0,l.$)().navs;return o.createElement(z,Object.assign({navs:t},e))},M=["children","border","fixed","wraperBg","logoProps"],T=function(e){e.children;var t,r=e.border,i=e.fixed,a=e.wraperBg,l=e.logoProps,c=(0,n.Z)(e,M),d=(0,s.useColorMode)().colorMode;return o.createElement(m.k,((t={as:"header",w:"100%",position:i?"fixed":null,top:"0",borderBottomWidth:r?"1px":"0",bg:a,zIndex:"9999"}).bg="light"===d?"var(--chakra-colors-white)":"var(--chakra-colors-gray-800)",t),o.createElement(m.k,Object.assign({h:["3em","3.5em","4em","4.5em"],left:"0",right:"0",top:"0",px:["1em","0","0","0"],margin:"0 auto",alignItems:"center"},c),o.createElement(u,l),o.createElement(m.k,{flex:"1",justifyContent:"flex-end"},o.createElement(_,null),o.createElement(p.default,null))))},W=r(59075),D=r(38967),A=r(62161),I=r(51900),B=["children","disableBorder","disableGotop","disableLogo","disableSocials","disableLinks","logoProps"],$=function(e){var t=e.children,r=e.disableBorder,a=e.disableGotop,c=e.disableLogo,s=e.disableSocials,m=e.disableLinks,d=e.logoProps,p=void 0===d?{}:d,f=(0,n.Z)(e,B),g=(0,l.$)(),h=g.copyright,v=g.primaryColor,E=g.author,b=g.links,y=void 0===b?[]:b,k=g.socials,w=void 0===k?{}:k;return o.createElement(i.xu,{w:"100%",borderTopStyle:"solid",borderTopWidth:r?"0":"1px"},o.createElement(i.xu,Object.assign({left:"0",right:"0",top:"0",px:["1em","0","0","0"],pt:"2rem",pb:"1rem",margin:"0 auto",position:"relative",borderTopStyle:"solid"},f),!a&&o.createElement(D.default,{colorScheme:v}),t,o.createElement(x.M,{w:"100%",mt:[".5rem",".7rem",".7rem","1rem"],columns:[1,1,3,4],spacing:"1rem"},o.createElement(i.xu,null,!c&&o.createElement(u,Object.assign({expend:!0},p)),!s&&o.createElement(W.Socials,{mt:"1rem",socials:w})),!m&&o.createElement(A.default,{links:y})),o.createElement(I.default,{flexWrap:"wrap",mt:"2rem",copyright:h,author:E})))},L=r(12724),H=["title","description","header","footer","fixed","children","extendFooter"],J=(0,l.$)().maxWidth,R=void 0===J?["100%","80%","80%","80%","60rem"]:J,V=function(e){var t=e.title,r=e.description,a=e.header,l=void 0===a?{}:a,s=e.footer,m=void 0===s?{}:s,d=e.fixed,u=void 0===d||d,p=e.children,f=e.extendFooter,g=((0,n.Z)(e,H),Array.isArray(R)?R:["100%","80%","80%","80%",R]);return o.createElement(L.Mp,{minH:"calc(100vh)"},o.createElement(c,{title:t,description:r,meta:[{name:"viewport",content:"width=device-width, initial-scale=1.0, minimum-scale=1.0"}]}),o.createElement(T,Object.assign({fixed:u,w:g},l)),o.createElement(i.xu,{as:"main",pt:u?["3em","3.5em","4em","4.5em"]:null},p),o.createElement($,Object.assign({w:g},m),f))}},53713:function(e,t,r){"use strict";r.d(t,{O:function(){return n},Y:function(){return o}});var n=["green","teal","blue","red","orange","yellow","cyan","purple","pink"],o=function(e){return n[e%n.length]}},10334:function(e,t,r){var n=r(87757),o=r(48926);t.Q=function(e){return e.replace(/\/\/+/g,"/")}}}]);
//# sourceMappingURL=ae0d7838046948705c4f8fe106a064369a906e86-ac05ad7d230c3c1b2689.js.map
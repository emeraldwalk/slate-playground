(this["webpackJsonp@slate-playground/0.47x"]=this["webpackJsonp@slate-playground/0.47x"]||[]).push([[0],{187:function(e,t,n){"use strict";n.r(t);var a=n(2),o=n.n(a),r=n(28),c=n.n(r),l=(n(83),n(77)),u=n(49),i=n(29),s=n(72),m=n(76),d=n(3).n.fromJS({document:{nodes:[{nodes:[{object:"text",text:"Block A"}],object:"block",type:"paragraph"},{nodes:[{object:"text",text:"Block B"}],object:"block",type:"paragraph"}]}}),v={moveToStartOfDocument:[],moveToEndOfDocument:[],moveAnchorForward:[1],moveFocusForward:[1],moveStartForward:[1],moveEndForward:[1]};function p(e,t){return Object(s.a)({},e,Object(i.a)({},t.type,t.payload))}function f(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),o=2;o<n;o++)a[o-2]=arguments[o];return function(){null===e||void 0===e||e[t].apply(e,a),null===e||void 0===e||e.focus()}}var b=function(){var e=Object(a.useRef)(null),t=Object(a.useState)(d),n=Object(u.a)(t,2),r=n[0],c=n[1],i=Object(a.useReducer)(p,v),s=Object(u.a)(i,2),b=s[0],y=s[1];return Object(a.useEffect)((function(){var t;null===(t=e.current)||void 0===t||t.focus()}),[]),o.a.createElement("div",{className:"c_app"},o.a.createElement("h1",null,"SlateJS Editor Playground"),o.a.createElement(m.a,{className:"c_editor",onChange:function(e){var t=e.value;c(t)},ref:e,value:r}),o.a.createElement("div",{className:"row"},o.a.createElement("pre",{className:"c_value"},JSON.stringify(r.toJS(),void 0,2)),o.a.createElement("div",{className:"c_controls"},Object.keys(b).map((function(t){var n=b[t];return o.a.createElement("div",{className:"c_control",key:t},n.map((function(e,a){return"string"===typeof e||"number"===typeof e?o.a.createElement("input",{key:a,onChange:function(e){var o=e.currentTarget,r=n.slice();r[a]=o.value,y({type:t,payload:r})},value:e}):null})),o.a.createElement("button",{onClick:f.apply(void 0,[e.current,t].concat(Object(l.a)(n)))},t,"(",n.join(","),")"))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},78:function(e,t,n){e.exports=n(187)},83:function(e,t,n){}},[[78,1,2]]]);
//# sourceMappingURL=main.a73d4c98.chunk.js.map
(this["webpackJsonp@slate-playground/0.47x"]=this["webpackJsonp@slate-playground/0.47x"]||[]).push([[0],{191:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),c=n(29),r=n.n(c),l=(n(85),n(86),n(32)),u=n(21),s=n(30),i=n(31),d=n(78),m=n(3),f=n(52),v=n.n(f),p=v.a.mark(b);function b(e){var t,n,o;return v.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:t=[e.document],n=!1;case 2:if(!(t.length>0)){a.next=15;break}if((o=t.shift()).key===e.selection.start.key&&(n=!0),"text"===o.object){a.next=9;break}t.unshift.apply(t,Object(l.a)(o.nodes.toArray())),a.next=12;break;case 9:if(!n){a.next=12;break}return a.next=12,o;case 12:o.key===e.selection.end.key&&(n=!1),a.next=2;break;case 15:case"end":return a.stop()}}),p)}var y=m.n.fromJS({document:{nodes:[{nodes:[{nodes:[{object:"text",text:"Block A1"}],object:"block",type:"paragraph"},{nodes:[{object:"text",text:"Block A2"}],object:"block",type:"paragraph"}],object:"block",type:"div"},{nodes:[{object:"text",text:"Block B"}],object:"block",type:"paragraph"},{nodes:[{object:"text",text:"Block C"}],object:"block",type:"paragraph"}]}}),k={moveToStartOfDocument:[],moveToEndOfDocument:[],moveAnchorForward:[1],moveFocusForward:[1],moveStartForward:[1],moveEndForward:[1],moveStartToStartOfDocument:[],moveStartToEndOfDocument:[],moveEndToStartOfDocument:[],moveEndToEndOfDocument:[],moveAnchorToStartOfDocument:[],moveAnchorToEndOfDocument:[],moveFocusToStartOfDocument:[],moveFocusToEndOfDocument:[],moveToStartOfNextBlock:[],moveToEndOfNextBlock:[],splitBlock:[1],insertText:[""]};function E(e,t){return Object(i.a)({},e,Object(s.a)({},t.type,t.payload))}function O(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];return function(){(null===e||void 0===e?void 0:e[t]).apply(void 0,o),null===e||void 0===e||e.focus()}}var j=function(){var e=Object(o.useRef)(null),t=Object(o.useState)(y),n=Object(u.a)(t,2),c=n[0],r=n[1],s=Object(o.useReducer)(E,k),m=Object(u.a)(s,2),f=m[0],v=m[1],p=Object(o.useState)([]),j=Object(u.a)(p,2),h=j[0],x=j[1],S=Object(o.useState)(""),g=Object(u.a)(S,2),w=g[0],T=g[1],_=Object(o.useCallback)((function(e){return""===w||e.toLowerCase().indexOf(w.toLowerCase())>-1}),[w]),A=Object(o.useMemo)((function(){var e=Array.from(b(c)).map((function(e){return e.key}));return function e(t,n){if("text"===t.object)return{key:t.key,isSelected:n.indexOf(t.key)>-1,object:t.object,_slateNode:t};var o=t.nodes.toArray().map((function(t){return e(t,n)}));return Object(i.a)({key:t.key},t.toJSON(),{isSelected:o.every((function(e){return e.isSelected})),nodes:o,_slateNode:t})}(c.document,e)}),[c]),C=Object(o.useCallback)((function(t){e.current.moveAnchorToStartOfNode(t),e.current.moveFocusToEndOfNode(t),e.current.focus()}),[]);return Object(o.useEffect)((function(){var t;null===(t=e.current)||void 0===t||t.focus()}),[]),Object(o.useEffect)((function(){if(e.current){var t=Object.keys(e.current).filter((function(t){return"function"===typeof e.current[t]&&!(t in f)}));t.sort(),x(t)}}),[f]),a.a.createElement("div",{className:"c_app"},a.a.createElement("h1",null,"SlateJS Editor Playground"),a.a.createElement("div",{className:"row"},a.a.createElement(d.a,{className:"c_editor",onChange:function(e){var t=e.value;r(t)},ref:e,value:c}),a.a.createElement("button",{onClick:function(){return r(y)}},"Reset")),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"c_value"},a.a.createElement("h2",null,"Value"),a.a.createElement("div",{className:"scroll"},a.a.createElement(N,{onSelect:C,node:A}))),a.a.createElement("div",{className:"c_controls"},a.a.createElement("h2",null,"Editor Methods"),a.a.createElement("input",{className:"c_filter",onChange:function(e){var t=e.currentTarget;return T(t.value)},placeholder:"Filter...",value:w}),a.a.createElement("div",{className:"scroll"},Object.keys(f).filter(_).map((function(t){var n=f[t];return a.a.createElement("div",{className:"c_control",key:t},n.map((function(e,o){return"string"===typeof e||"number"===typeof e?a.a.createElement("input",{key:o,onChange:function(e){var a=e.currentTarget,c=n.slice(),r="number"===typeof c[o]?isNaN(Number(a.value))?c[o]:Number(a.value):a.value;c[o]=r,v({type:t,payload:c})},value:e}):null})),a.a.createElement("button",{onClick:O.apply(void 0,[e.current,t].concat(Object(l.a)(n)))},t,"(",function(e){return e.map((function(e){return"string"===typeof e?"'".concat(e,"'"):e}))}(n),")"))})),a.a.createElement("h2",null,"Additional Methods"),a.a.createElement("ul",{className:"c_additional-methods"},h.filter(_).map((function(e){return a.a.createElement("li",{key:e},e)})))))))},h=n(79),N=function e(t){var n=t.node,o=t.onSelect,c=(n._slateNode,n.isSelected,n.nodes),r=void 0===c?[]:c,l=Object(h.a)(n,["_slateNode","isSelected","nodes"]),u=JSON.stringify(l,void 0,2);return a.a.createElement("pre",{className:"c_node".concat(n.isSelected?" selected":""),onClick:function(e){e.stopPropagation(),o(n._slateNode)}},"text"===n.object?u.replace(/}$/,"},"):u.replace(/\n}$/,',\n  "nodes": ['),a.a.createElement("pre",{className:"c_node-list"},r.map((function(t){return a.a.createElement(a.a.Fragment,{key:t.key},a.a.createElement(e,{onSelect:o,node:t}))}))),"text"!==n.object&&"  ]\n}")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},80:function(e,t,n){e.exports=n(191)},86:function(e,t,n){}},[[80,1,2]]]);
//# sourceMappingURL=main.349283b5.chunk.js.map
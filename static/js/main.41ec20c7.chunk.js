(this["webpackJsonpfloat-calculator"]=this["webpackJsonpfloat-calculator"]||[]).push([[0],[,,function(e,t){e.exports={addZeroes:function(e){return Number.isInteger(e)?e.toFixed(1):e},numTo64BitBinary:function(e){return e.toString(2).padStart(64,"0")},binToFloat:function(e){var t=e.slice(0,1),n=e.slice(1,12),a=e.slice(12,64),r="0"===t?1:-1,o=parseInt(n,2),c=parseInt(a,2);return 2047===o&&0!==c?NaN:r*((0===o?0:1)+c/Math.pow(2,52))*Math.pow(2,(o||1)-1023)},floatToNum:function(e){var t=new Float64Array(1);t[0]=e;var n,a=new Uint8Array(t.buffer),r="";for(n=a.length-1;n>=0;n--){var o=a[n].toString(2);o.length<8&&(o=new Array(8-o.length).fill("0").join("")+o),r+=o}return BigInt("0b"+r)}}},,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),c=n.n(o),i=n(1);n(10),n(11);function l(e){var t=e.target||e;"INPUT"===t.tagName&&(t.parentNode.style.color=t.checked?"#000000":"#EEEEEE",t.parentNode.style.background=t.checked?"#EEEEEE":"#222222")}function s(e){var t=e.onToggle;return r.a.createElement("label",{className:"checkbox",onClick:l},r.a.createElement("input",{className:"bit",type:"checkbox",onChange:t}),r.a.createElement("span",null))}n(12);var u=function(e){var t=e.cls,n=e.children,a="cell ".concat(t);return r.a.createElement("div",{className:a},n)};var f=function(e){var t=e.cols,n=e.colsClasses;return t.map((function(e,t){var a=n[t%4];return r.a.createElement(u,{key:t,cls:a},e)}))};n(13);var d=function(e){var t=e.table,n=e.colWidth,a=e.colsClasses,o=n||"repeat(".concat(t[0].length,", max-content)");return r.a.createElement("div",{className:"table",style:{gridTemplateColumns:o}},t.map((function(e,t){return r.a.createElement(f,{key:t,cols:e,colsClasses:a})})))},m=n(2);function p(){var e=Object(a.useState)("0.0"),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)("0.0"),u=Object(i.a)(c,2),f=u[0],p=u[1],b=Object(a.useState)("0.0"),v=Object(i.a)(b,2),g=v[0],E=v[1],h=Object(a.useState)("0".repeat(64)),y=Object(i.a)(h,2),j=y[0],O=y[1],w=Object(a.useState)("0x0"),k=Object(i.a)(w,2),S=k[0],B=k[1],N=Object(a.useState)("+1"),C=Object(i.a)(N,2),T=C[0],x=C[1],I=Object(a.useState)("-1023 (denormalized)"),A=Object(i.a)(I,2),W=A[0],P=A[1],F=Object(a.useState)("1.0 (denormalized)"),M=Object(i.a)(F,2),R=M[0],U=M[1],z=Object(a.useState)("0"),V=Object(i.a)(z,2),K=V[0],Z=V[1],J=Object(a.useState)("0"),L=Object(i.a)(J,2),q=L[0],D=L[1],H=Object(a.useState)("0"),$=Object(i.a)(H,2),G=$[0],Q=$[1];function X(e){var t=e||Array.from(document.getElementsByClassName("bit")).map((function(e){return e.checked?1:0})).join(""),n=t.slice(0,1),a=t.slice(1,12),r=t.slice(12,64),c=parseInt(a,2),i=parseInt(r,2);x("0"===n?"+1":"-1"),P("".concat(c-1023).concat(0===c?" (denormalized)":"")),U("".concat(Object(m.addZeroes)((0===c?0:1)+i/Math.pow(2,52))).concat(0===c?" (denormalized)":"")),Z(n),D(c.toString()),Q(parseInt(r,2).toString());var s=0xffffffffffffffffn&BigInt("0b"+t),u=Object(m.binToFloat)(t);o(Object(m.addZeroes)(u)),p(),E(),O(s.toString(2).padStart(64,"0")),B("0x"+s.toString(16)),document.querySelectorAll("input.bit").forEach((function(e,n){e.checked="1"===t[n],l(e)}))}var Y=[["","Sign","Exponent","Mantissa"],["Value:",T,r.a.createElement("span",null,"2",r.a.createElement("sup",{id:"exponent"},W)),R],["Encoded as:",K,q,G],["Binary:",r.a.createElement(s,{onToggle:function(){return X()}}),Array(11).fill().map((function(e,t){return r.a.createElement(s,{key:t,onToggle:function(){return X()}})})),r.a.createElement("div",{className:"wrap-2-col"},Array(52).fill().map((function(e,t){return r.a.createElement(s,{key:t+11,onToggle:function(){return X()}})})))]],_=[["Decimal representation:",r.a.createElement("input",{className:"input",value:n,onKeyPress:function(e){if("Enter"===e.key){var t=parseFloat(e.target.value)||0;X(Object(m.numTo64BitBinary)(Object(m.floatToNum)(t)))}},onChange:function(e){o(e.target.value)}})],["Value actually stored in float:",r.a.createElement("input",{className:"input",disabled:!0,defaultValue:f})],["Error due to conversion:",r.a.createElement("input",{className:"input",disabled:!0,defaultValue:g})],["Binary Representation:",r.a.createElement("input",{className:"input",value:j,onKeyPress:function(e){"Enter"===e.key&&X(e.target.value.padStart(64,"0"))},onChange:function(e){O(e.target.value)}})],["Hexadecimal Representation:",r.a.createElement("input",{className:"input",value:S,onKeyPress:function(e){if("Enter"===e.key){var t=BigInt(e.target.value)||0;X(Object(m.numTo64BitBinary)(t))}},onChange:function(e){B(e.target.value)}})]];return r.a.createElement("div",{className:"container"},r.a.createElement(d,{table:Y,colsClasses:["","center sign","center exponent","center mantissa"],colWidth:"1fr 0fr 0fr 3fr"}),r.a.createElement("div",{className:"inputs"},r.a.createElement(d,{table:_,colsClasses:["label","label"]}),r.a.createElement("div",{className:"modifiers"},r.a.createElement("input",{type:"button",value:"+1",onClick:function(e){var t=BigInt(S)+1n&0xffffffffffffffffn;X(Object(m.numTo64BitBinary)(t))}}),r.a.createElement("input",{type:"button",value:"-1",onClick:function(e){var t=BigInt(S),n=0n===t?0xffffffffffffffffn:t-1n;X(Object(m.numTo64BitBinary)(n))}}),r.a.createElement("input",{type:"button",value:"<<",onClick:function(e){var t=BigInt(S)<<1n&0xffffffffffffffffn;X(Object(m.numTo64BitBinary)(t))}}),r.a.createElement("input",{type:"button",value:">>",onClick:function(e){var t=BigInt(S)>>1n;X(Object(m.numTo64BitBinary)(t))}}))))}n(14);var b=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function v(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/float-calculator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/float-calculator","/service-worker.js");b?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):v(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):v(t,e)}))}}()}],[[5,1,2]]]);
//# sourceMappingURL=main.41ec20c7.chunk.js.map
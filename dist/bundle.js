var myApp;myApp=(()=>{"use strict";var e={160:(e,t,r)=>{r.r(t);class o{constructor(e,t){this.name=e,this.color=t,this.startPos="black"===t?[{y:7,x:1},{y:7,x:2},{y:7,x:3},{y:7,x:4},{y:7,x:5},{y:7,x:6},{y:7,x:7},{y:7,x:8}]:[{y:2,x:1},{y:2,x:2},{y:2,x:3},{y:2,x:4},{y:2,x:5},{y:2,x:6},{y:2,x:7},{y:2,x:8}]}}class s{constructor(e,t){this.name=e,this.color=t,this.startPos="black"===t?[{y:8,x:1},{y:8,x:8}]:[{y:1,x:1},{y:1,x:8}]}}class c{constructor(e,t){this.name=e,this.color=t,this.startPos="black"===t?[{y:8,x:2},{y:8,x:7}]:[{y:1,x:2},{y:1,x:7}]}}class u{constructor(e,t){this.name=e,this.color=t,this.startPos="black"===t?[{y:8,x:3},{y:8,x:6}]:[{y:1,x:3},{y:1,x:6}]}}class i{constructor(e,t){this.name=e,this.color=t,this.startPos="black"===t?[{y:8,x:4}]:[{y:1,x:4}]}}class n{constructor(e,t){this.name=e,this.color=t,this.startPos="black"===t?[{y:8,x:5}]:[{y:1,x:5}]}}const l=e=>e.getAttribute("piece").split("-")[1],p=e=>e.getAttribute("piece").split("-")[0],a=e=>{let t;return t="black"===p(e)?1:-1,t},g=e=>"white"===e.color?"black":"white",b=(e,t,r)=>{t(e.current).forEach((t=>{if(t.length>0){let o=0,s=null,c=null,u=!1;t.forEach((t=>{t&&t.classList.value.includes(`${g(e)}-king`)&&(console.log(t),s=t),t&&t!==e.current&&t.getAttribute("piece")&&p(t)!==e.color&&"king"!==l(t)&&(c=t,o++),t&&t!==e.current&&t.getAttribute("piece")&&p(t)===e.color&&(u=!0)})),console.log(s,c),s&&c&&o<=1&&!u&&(!(r.pinLine.length&&l(r.pinLine[0])===l(e.current))&&r.pinLine.push(e.current,...t.slice(0,t.indexOf(s))),r.pinedPiece=c)}}))},h=(e,t)=>(e.forEach((e=>e.forEach(((r,o)=>r&&r.getAttribute("piece")&&"king"!==l(r)||r&&r.getAttribute("piece")&&l(r)&&"king"===l(r)&&p(t)===p(r)?e.splice(o+1):null)))),e),A=e=>{let t=new Array(4).fill(null),r=!1;return t.map(((t,o)=>{let s=[];o%2==0&&(r=!r);for(let t=1;t<=7;t++)o%2!=0||r?o%2==0||r?o%2==0&&r?s.push(document.querySelector(`[posY="${+e.getAttribute("posY")+t}"][posX="${+e.getAttribute("posX")-t}"]`)):o%2!=0&&r&&s.push(document.querySelector(`[posY="${+e.getAttribute("posY")-t}"][posX="${+e.getAttribute("posX")+t}"]`)):s.push(document.querySelector(`[posY="${+e.getAttribute("posY")+t}"][posX="${+e.getAttribute("posX")+t}"]`)):s.push(document.querySelector(`[posY="${+e.getAttribute("posY")-t}"][posX="${+e.getAttribute("posX")-t}"]`));return s}))},k=e=>{let t=new Array(4).fill(null),r=!1;return t.map(((t,o)=>{let s=[];o%2==0&&(r=!r);for(let t=1;t<=7;t++)o%2!=0||r?o%2==0||r?o%2==0&&r?s.push(document.querySelector(`[posY="${+e.getAttribute("posY")+t}"][posX="${+e.getAttribute("posX")}"]`)):o%2!=0&&r&&s.push(document.querySelector(`[posY="${+e.getAttribute("posY")-t}"][posX="${+e.getAttribute("posX")}"]`)):s.push(document.querySelector(`[posY="${+e.getAttribute("posY")}"][posX="${+e.getAttribute("posX")+t}"]`)):s.push(document.querySelector(`[posY="${+e.getAttribute("posY")}"][posX="${+e.getAttribute("posX")-t}"]`));return s}))},d=e=>{switch(l(e)){case"rook":return h(k(e),e);case"bishop":return h(A(e),e);case"horse":return(e=>[[document.querySelector(`[posY="${+e.getAttribute("posY")-2}"][posX="${+e.getAttribute("posX")+1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")-2}"][posX="${+e.getAttribute("posX")-1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")-1}"][posX="${+e.getAttribute("posX")+2}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")-1}"][posX="${+e.getAttribute("posX")-2}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")+1}"][posX="${+e.getAttribute("posX")-2}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")+1}"][posX="${+e.getAttribute("posX")+2}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")+2}"][posX="${+e.getAttribute("posX")-1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")+2}"][posX="${+e.getAttribute("posX")+1}"]`)]])(e);case"pawn":return(e=>{let t=a(e),r=[[document.querySelector(`[posY="${+e.getAttribute("posY")-t}"][posX="${e.getAttribute("posX")}"]`)]];return null!==e.getAttribute("firstMove")&&r.push([document.querySelector(`[posY="${+e.getAttribute("posY")-2*t}"][posX="${e.getAttribute("posX")}"]`)]),r.flat().forEach(((e,t)=>e&&null!==e.getAttribute("piece")?r.splice(t):null)),r})(e);case"queen":return h((e=>[...k(e),...A(e)])(e),e);case"king":return(e=>[[document.querySelector(`[posY="${+e.getAttribute("posY")+1}"][posX="${+e.getAttribute("posX")-1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")+1}"][posX="${+e.getAttribute("posX")}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")+1}"][posX="${+e.getAttribute("posX")+1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")}"][posX="${+e.getAttribute("posX")-1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")}"][posX="${+e.getAttribute("posX")+1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")-1}"][posX="${+e.getAttribute("posX")+1}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")-1}"][posX="${+e.getAttribute("posX")}"]`)],[document.querySelector(`[posY="${+e.getAttribute("posY")-1}"][posX="${+e.getAttribute("posX")-1}"]`)]])(e)}};let y=document.querySelector(".board");for(let e=0;e<8;e++)for(let e=0;e<8;e++){let e=document.createElement("div");e.classList.add("square"),y.appendChild(e)}let $=8,m=1,f=document.querySelectorAll(".square"),Y=!1;for(let e=0;e<f.length;e++)m>8&&($--,m=1,Y=!Y),f[e].setAttribute("posY",$),f[e].setAttribute("posX",m),!1===Y?(f[e].style.backgroundColor="#f1f1f1",Y=!Y):(f[e].style.backgroundColor="#85aa53",Y=!Y),m++;let X=new class{create(e,t){switch(e){case"pawn":return new o(e,t);case"rook":return new s(e,t);case"horse":return new c(e,t);case"bishop":return new u(e,t);case"queen":return new i(e,t);case"king":return new n(e,t)}}};const x=[X.create("pawn","black"),X.create("rook","black"),X.create("horse","black"),X.create("bishop","black"),X.create("queen","black"),X.create("king","black")],v=e=>{let t=e[0].color;e.forEach((e=>{e.startPos.forEach((r=>{let o=document.querySelector(`[posX="${r.x}"][posY="${r.y}"]`);o.setAttribute("piece",`${t}-${e.name}`),o.classList.add(`${t}-${e.name}`),"pawn"===e.name&&o.setAttribute("firstMove",!0),"king"===e.name&&o.setAttribute("is-checked",0)}))}))};var q;!function(e){v(e)}(x),q=[X.create("pawn","white"),X.create("rook","white"),X.create("horse","white"),X.create("bishop","white"),X.create("queen","white"),X.create("king","white")],v(q);const S={checkLines:[],saveMoves:[],pinedPiece:null,pinLine:[],isCheckmate:!1,kingInCheck:null};let L=document.querySelector(".current-turn"),w=[],E="white";L.innerHTML=`CURRENT TURN: ${E}`;const M=e=>{let t=[],r=g(e);return"bishop"!==l(e.current)&&"queen"!==l(e.current)||b(e,A,S),"rook"!==l(e.current)&&"queen"!==l(e.current)||b(e,k,S),e.nextMoves.flat().forEach((o=>{if(o){if("king"===l(e.current)&&!o.getAttribute(`${r}-attack`)&&(null!==o.getAttribute("piece")&&p(o)!==e.color||null===o.getAttribute("piece")))return t.push(o);if(null!==o.getAttribute("piece")&&"king"===l(o)&&p(o)!==e.color)return e.nextMoves.forEach((t=>{t.length>0&&t.forEach((o=>{o&&o.classList.value.includes(`${r}-king`)&&(!S.checkLines.some((t=>l(t[0])===l(e.current)))&&S.checkLines.push([e.current,...t.slice(0,t.indexOf(o)+1)]),S.kingInCheck=r)}))})),o.setAttribute("is-checked",1),void o.classList.add("red");if(null===o.getAttribute("piece")&&"king"!==l(e.current))return t.push(o);if(null!==o.getAttribute("piece")&&p(o)!==e.color&&"king"!==l(o)&&"king"!==l(e.current))return t.push(o)}})),1===S.checkLines.length&&S.kingInCheck?(t.forEach((t=>{S.checkLines.forEach((r=>{r.forEach((r=>{(e.color===S.kingInCheck&&r===t&&"king"!==l(e.current)||e.color===S.kingInCheck&&"king"===l(e.current))&&S.saveMoves.push(t)}))}))})),S.saveMoves):2===S.checkLines.length&&S.kingInCheck?(t.forEach((t=>{"king"===l(e.current)&&e.color===S.kingInCheck&&S.saveMoves.push(t)})),S.saveMoves):S.pinedPiece===e.current?(t=[],e.nextMoves.flat().forEach((e=>{S.pinLine.forEach((r=>{r===e&&t.push(e)}))})),t):t},C=(e,t)=>{let r=e.current,o=a(r),s=g(e),c=[document.querySelector(`[posY="${+r.getAttribute("posY")-o}"][posX="${+r.getAttribute("posX")-1}"]`),document.querySelector(`[posY="${+r.getAttribute("posY")-o}"][posX="${+r.getAttribute("posX")+1}"]`)];return c.forEach((r=>{r&&(r.setAttribute(`${t}-attack`,!0),r.getAttribute("piece")&&"king"===l(r)&&p(r)!==t)&&(r.setAttribute("is-checked",1),r.classList.add("red"),S.kingInCheck=s,!S.checkLines.some((t=>l(t[t.length-1])===l(e.current)))&&S.checkLines.push([e.current]))})),e.nextMoves=c.filter((e=>e&&null!==e.getAttribute("piece")&&p(e)!==t&&"king"!==l(e))),e};f.forEach((e=>{e.addEventListener("click",(e=>{((e,t)=>{let r=[],o=e.target;null!==o&&o.getAttribute("piece")&&o.classList.add("current"),w.length<2&&w.push(o),2===w.length&&(w[1].classList.contains("next")&&((e=>{let t=e[0],r=e[1],o=p(t);r.classList.remove(r.getAttribute("piece")),r.removeAttribute("piece"),t.getAttribute(!0)&&t.removeAttribute("firstMove"),"pawn"!==l(t)||1!=+r.getAttribute("posY")&&8!=+r.getAttribute("posY")?(r.classList.add(t.getAttribute("piece")),r.setAttribute("piece",t.getAttribute("piece"))):(r.classList.add(`${o}-queen`),r.setAttribute("piece",`${o}-queen`)),t.classList.remove(t.getAttribute("piece"),"current"),t.removeAttribute("piece")})(w),E="white"===E?"black":"white",L.innerHTML=`CURRENT TURN: ${E}`),w=[],o=null,S.checkLines=[],S.pinLine=[],S.pinedPiece=null,S.kingInCheck=null,t.forEach((e=>{e.removeAttribute("white-attack"),e.removeAttribute("black-attack"),e.removeAttribute("is-checked"),e.classList.remove("red","next","current")}))),(e=>{let t=[];e.forEach((e=>null!==e.getAttribute("piece")?t.push({current:e,nextMoves:d(e),color:p(e)}):null)),t.forEach((e=>"pawn"!==l(e.current)&&e.nextMoves.flat().forEach((t=>t&&t.setAttribute(`${e.color}-attack`,!0)))));let r=!1;for(let e=0;e<t.length;e++){!r&&S.kingInCheck&&(e=0,r=!0),S.saveMoves=[];let o=t[e];if(o&&"pawn"===l(o.current))o.nextMoves=[...M(o),...M(C(o,o.color))];else{let e=M(o);o.nextMoves=e}}return!t.find((e=>e.nextMoves.length))&&(S.isCheckmate=!0),S.isCheckmate?setTimeout((()=>alert("checkmate sorry"))):t})(t).forEach((e=>{e.current===o&&r.push(...e.nextMoves)})),r.forEach((e=>{null!==e&&p(o)===E&&e.classList.add("next")}))})(e,f)}))}))}},t={};function r(o){if(t[o])return t[o].exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}return r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(160)})();
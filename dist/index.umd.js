!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["switch-store"]={})}(this,(function(e){"use strict";const t=e=>"function"==typeof e,n=(e,n="")=>{if(!t(e))throw new TypeError(`${n} Expecting function arg`.trim())};e.createSwitchStore=(e=!1,s=null)=>{const i=e=>({isOn:e,isOpen:e,isOff:!e,isClosed:!e}),o=((e,s=null)=>{const i=e=>t(s?.persist)&&s.persist(e);let o=(()=>{const e=new Map,t=t=>(e.has(t)||e.set(t,new Set),e.get(t)),n=(e,n)=>{if("function"!=typeof n)throw new TypeError("Expecting callback function as second argument");return t(e).add(n),()=>t(e).delete(n)};return{publish:(e,n)=>{t(e).forEach((e=>e(n)))},subscribe:n,subscribeOnce:(e,t)=>{const s=n(e,(e=>{t(e),s()}));return s},unsubscribeAll:t=>e.delete(t)}})(),r=e;i(r);const c=()=>r,u=e=>{r!==e&&(r=e,i(r),o.publish("change",r))};return{set:u,get:c,update:e=>{n(e,"[update]"),u(e(c()))},subscribe:e=>(n(e,"[subscribe]"),e(r),o.subscribe("change",e))}})({...i(!!e),data:s}),r=(e,t)=>{let n=o.get();void 0!==t&&(n={...n,data:t}),o.set({...n,...i(!!e)})},c=(...e)=>e[e.length>1?1:0],u=(...e)=>r(!0,c(...e)),f=(...e)=>r(!1,c(...e));return{subscribe:o.subscribe,get:o.get,on:u,off:f,toggle:()=>o.update((e=>({...e,...i(!e.isOn)}))),open:u,close:f}}}));

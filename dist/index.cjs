"use strict";const e=e=>"function"==typeof e,t=(t,s="")=>{if(!e(t))throw new TypeError(`${s} Expecting function arg`.trim())};exports.createSwitchStore=(s=!1,n=null)=>{const r=e=>({isOn:!!e,isOpen:!!e,isOff:!e,isClosed:!e}),c=((s,n=null)=>{const r=t=>e(n?.persist)&&n.persist(t);let c=(()=>{const e=new Map,t=t=>(e.has(t)||e.set(t,new Set),e.get(t)),s=(e,s)=>{if("function"!=typeof s)throw new TypeError("Expecting callback function as second argument");return t(e).add(s),()=>t(e).delete(s)};return{publish:(e,s={})=>{t(e).forEach((e=>e(s)))},subscribe:s,subscribeOnce:(e,t)=>{const n=s(e,(e=>{t(e),n()}));return n},unsubscribeAll:t=>e.delete(t)}})(),i=s;r(i);const o=()=>i,u=e=>{i!==e&&(i=e,r(i),c.publish("change",i))};return{set:u,get:o,update:e=>{t(e,"[update]"),u(e(o()))},subscribe:e=>(t(e,"[subscribe]"),e(i),c.subscribe("change",e))}})({...r(s),data:n}),i=(e,t)=>{let s=c.get();void 0!==t&&(s={...s,data:t}),c.set({...s,...r(!!e)})},o=(e=void 0)=>i(!0,e),u=(e=void 0)=>i(!1,e);return{subscribe:c.subscribe,get:c.get,on:o,off:u,toggle:()=>c.update((e=>({...e,...r(!e.isOn)}))),open:o,close:u}};

!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},t.parcelRequired7c6=o);var a=o("6JpON");function l(e,t){return new Promise((function(n,i){setTimeout((function(){Math.random()>.3?n({position:e,delay:t}):i({position:e,delay:t})}),t)}))}document.getElementById("promise-form").addEventListener("submit",(function(t){t.preventDefault();var n=Number(t.target.elements.delay.value);if(Number.isNaN(n))notiflix.Notify.failure("Invalid delay value!");else{var i=Number(t.target.elements.step.value);if(Number.isNaN(i))notiflix.Notify.failure("Invalid step value!");else{var o=Number(t.target.elements.amount.value);if(Number.isNaN(o))notiflix.Notify.failure("Invalid amount value!");else{for(var r=[],u=1;u<=o;u++){var f=l(u,n+(u-1)*i);r.push(f)}Promise.allSettled(r).then((function(t){t.forEach((function(t){var n=t.value||t.reason,i=n.position,o=n.delay;"fulfilled"===t.status?e(a).Notify.success("Fulfilled promise ".concat(i," in ").concat(o,"ms")):e(a).Notify.failure("Rejected promise ".concat(i," in ").concat(o,"ms"))}))}))}}}}))}();
//# sourceMappingURL=03-promises.a6187fce.js.map

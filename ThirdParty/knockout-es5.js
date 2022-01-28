/*! For license information please see knockout-es5.js.LICENSE.txt */
var OBSERVABLES_PROPERTY="__knockoutObservables",SUBSCRIBABLE_PROPERTY="__knockoutSubscribable";function track(e,r){if(!e)throw new Error("When calling ko.track, you must pass an object as the first parameter.");var t=this,a=getAllObservablesForObject(e,!0);return(r=r||Object.getOwnPropertyNames(e)).forEach((function(r){if(r!==OBSERVABLES_PROPERTY&&r!==SUBSCRIBABLE_PROPERTY&&!(r in a)){var n=e[r],o=n instanceof Array,u=t.isObservable(n)?n:o?t.observableArray(n):t.observable(n);Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get:u,set:t.isWriteableObservable(u)?u:void 0}),a[r]=u,o&&notifyWhenPresentOrFutureArrayValuesMutate(t,u)}})),e}function getAllObservablesForObject(e,r){var t=e[OBSERVABLES_PROPERTY];return!t&&r&&(t={},Object.defineProperty(e,OBSERVABLES_PROPERTY,{value:t})),t}function defineComputedProperty(e,r,t){var a={owner:e,deferEvaluation:!0};if("function"==typeof t)a.read=t;else{if("value"in t)throw new Error('For ko.defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');if("function"!=typeof t.get)throw new Error('For ko.defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');a.read=t.get,a.write=t.set}return e[r]=this.computed(a),track.call(this,e,[r]),e}function notifyWhenPresentOrFutureArrayValuesMutate(e,r){var t=null;e.computed((function(){t&&(t.dispose(),t=null);var a=r();a instanceof Array&&(t=startWatchingArrayInstance(e,r,a))}))}function startWatchingArrayInstance(e,r,t){return getSubscribableForArray(e,t).subscribe(r)}function getSubscribableForArray(e,r){var t=r[SUBSCRIBABLE_PROPERTY];if(!t){t=new e.subscribable,Object.defineProperty(r,SUBSCRIBABLE_PROPERTY,{value:t});var a={};wrapStandardArrayMutators(r,t,a),addKnockoutArrayMutators(e,r,t,a)}return t}function wrapStandardArrayMutators(e,r,t){["pop","push","reverse","shift","sort","splice","unshift"].forEach((function(a){var n=e[a];e[a]=function(){var e=n.apply(this,arguments);return!0!==t.pause&&r.notifySubscribers(this),e}}))}function addKnockoutArrayMutators(e,r,t,a){["remove","removeAll","destroy","destroyAll","replace"].forEach((function(n){Object.defineProperty(r,n,{enumerable:!1,value:function(){var o;a.pause=!0;try{o=e.observableArray.fn[n].apply(e.observableArray(r),arguments)}finally{a.pause=!1}return t.notifySubscribers(r),o}})}))}function getObservable(e,r){if(!e)return null;var t=getAllObservablesForObject(e,!1);return t&&t[r]||null}function valueHasMutated(e,r){var t=getObservable(e,r);t&&t.valueHasMutated()}function attachToKo(e){e.track=track,e.getObservable=getObservable,e.valueHasMutated=valueHasMutated,e.defineProperty=defineComputedProperty}export default{attachToKo:attachToKo};
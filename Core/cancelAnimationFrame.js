import defined from"./defined.js";var implementation;function cancelAnimationFramePolyfill(e){implementation(e)}"undefined"!=typeof cancelAnimationFrame&&(implementation=cancelAnimationFrame),function(){if(!defined(implementation)&&"undefined"!=typeof window)for(var e=["webkit","moz","ms","o"],n=0,i=e.length;n<i&&!defined(implementation);)implementation=window[e[n]+"CancelAnimationFrame"],defined(implementation)||(implementation=window[e[n]+"CancelRequestAnimationFrame"]),++n;defined(implementation)||(implementation=clearTimeout)}();export default cancelAnimationFramePolyfill;
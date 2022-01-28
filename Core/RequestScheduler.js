import Uri from"../ThirdParty/Uri.js";import when from"../ThirdParty/when.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import Event from"./Event.js";import Heap from"./Heap.js";import isBlobUri from"./isBlobUri.js";import isDataUri from"./isDataUri.js";import RequestState from"./RequestState.js";function sortRequests(e,t){return e.priority-t.priority}var statistics={numberOfAttemptedRequests:0,numberOfActiveRequests:0,numberOfCancelledRequests:0,numberOfCancelledActiveRequests:0,numberOfFailedRequests:0,numberOfActiveRequestsEver:0,lastNumberOfActiveRequests:0},priorityHeapLength=20,requestHeap=new Heap({comparator:sortRequests});requestHeap.maximumLength=priorityHeapLength,requestHeap.reserve(priorityHeapLength);var activeRequests=[],numberOfActiveRequestsByServer={},pageUri="undefined"!=typeof document?new Uri(document.location.href):new Uri,requestCompletedEvent=new Event;function RequestScheduler(){}function updatePriority(e){defined(e.priorityFunction)&&(e.priority=e.priorityFunction())}function issueRequest(e){return e.state===RequestState.UNISSUED&&(e.state=RequestState.ISSUED,e.deferred=when.defer()),e.deferred.promise}function getRequestReceivedFunction(e){return function(t){if(e.state!==RequestState.CANCELLED){var s=e.deferred;--statistics.numberOfActiveRequests,--numberOfActiveRequestsByServer[e.serverKey],requestCompletedEvent.raiseEvent(),e.state=RequestState.RECEIVED,e.deferred=void 0,s.resolve(t)}}}function getRequestFailedFunction(e){return function(t){e.state!==RequestState.CANCELLED&&(++statistics.numberOfFailedRequests,--statistics.numberOfActiveRequests,--numberOfActiveRequestsByServer[e.serverKey],requestCompletedEvent.raiseEvent(t),e.state=RequestState.FAILED,e.deferred.reject(t))}}function startRequest(e){var t=issueRequest(e);return e.state=RequestState.ACTIVE,activeRequests.push(e),++statistics.numberOfActiveRequests,++statistics.numberOfActiveRequestsEver,++numberOfActiveRequestsByServer[e.serverKey],e.requestFunction().then(getRequestReceivedFunction(e)).otherwise(getRequestFailedFunction(e)),t}function cancelRequest(e){var t=e.state===RequestState.ACTIVE;if(e.state=RequestState.CANCELLED,++statistics.numberOfCancelledRequests,defined(e.deferred)){var s=e.deferred;e.deferred=void 0,s.reject()}t&&(--statistics.numberOfActiveRequests,--numberOfActiveRequestsByServer[e.serverKey],++statistics.numberOfCancelledActiveRequests),defined(e.cancelFunction)&&e.cancelFunction()}function updateStatistics(){RequestScheduler.debugShowStatistics&&(0===statistics.numberOfActiveRequests&&statistics.lastNumberOfActiveRequests>0&&(statistics.numberOfAttemptedRequests>0&&(console.log("Number of attempted requests: "+statistics.numberOfAttemptedRequests),statistics.numberOfAttemptedRequests=0),statistics.numberOfCancelledRequests>0&&(console.log("Number of cancelled requests: "+statistics.numberOfCancelledRequests),statistics.numberOfCancelledRequests=0),statistics.numberOfCancelledActiveRequests>0&&(console.log("Number of cancelled active requests: "+statistics.numberOfCancelledActiveRequests),statistics.numberOfCancelledActiveRequests=0),statistics.numberOfFailedRequests>0&&(console.log("Number of failed requests: "+statistics.numberOfFailedRequests),statistics.numberOfFailedRequests=0)),statistics.lastNumberOfActiveRequests=statistics.numberOfActiveRequests)}RequestScheduler.maximumRequests=50,RequestScheduler.maximumRequestsPerServer=6,RequestScheduler.requestsByServer={"api.cesium.com:443":18,"assets.cesium.com:443":18},RequestScheduler.throttleRequests=!0,RequestScheduler.debugShowStatistics=!1,RequestScheduler.requestCompletedEvent=requestCompletedEvent,Object.defineProperties(RequestScheduler,{statistics:{get:function(){return statistics}},priorityHeapLength:{get:function(){return priorityHeapLength},set:function(e){if(e<priorityHeapLength)for(;requestHeap.length>e;)cancelRequest(requestHeap.pop());priorityHeapLength=e,requestHeap.maximumLength=e,requestHeap.reserve(e)}}}),RequestScheduler.serverHasOpenSlots=function(e,t){t=defaultValue(t,1);var s=defaultValue(RequestScheduler.requestsByServer[e],RequestScheduler.maximumRequestsPerServer);return numberOfActiveRequestsByServer[e]+t<=s},RequestScheduler.heapHasOpenSlots=function(e){return requestHeap.length+e<=priorityHeapLength},RequestScheduler.update=function(){var e,t,s=0,r=activeRequests.length;for(e=0;e<r;++e)(t=activeRequests[e]).cancelled&&cancelRequest(t),t.state===RequestState.ACTIVE?s>0&&(activeRequests[e-s]=t):++s;activeRequests.length-=s;var u=requestHeap.internalArray,i=requestHeap.length;for(e=0;e<i;++e)updatePriority(u[e]);requestHeap.resort();for(var n=Math.max(RequestScheduler.maximumRequests-activeRequests.length,0),a=0;a<n&&requestHeap.length>0;)(t=requestHeap.pop()).cancelled?cancelRequest(t):!t.throttleByServer||RequestScheduler.serverHasOpenSlots(t.serverKey)?(startRequest(t),++a):cancelRequest(t);updateStatistics()},RequestScheduler.getServerKey=function(e){Check.typeOf.string("url",e);var t=new Uri(e);""===t.scheme()&&(t=new Uri(e).absoluteTo(pageUri)).normalize();var s=t.authority();/:/.test(s)||(s=s+":"+("https"===t.scheme()?"443":"80"));var r=numberOfActiveRequestsByServer[s];return defined(r)||(numberOfActiveRequestsByServer[s]=0),s},RequestScheduler.request=function(e){if(Check.typeOf.object("request",e),Check.typeOf.string("request.url",e.url),Check.typeOf.func("request.requestFunction",e.requestFunction),isDataUri(e.url)||isBlobUri(e.url))return requestCompletedEvent.raiseEvent(),e.state=RequestState.RECEIVED,e.requestFunction();if(++statistics.numberOfAttemptedRequests,defined(e.serverKey)||(e.serverKey=RequestScheduler.getServerKey(e.url)),!RequestScheduler.throttleRequests||!e.throttleByServer||RequestScheduler.serverHasOpenSlots(e.serverKey)){if(!RequestScheduler.throttleRequests||!e.throttle)return startRequest(e);if(!(activeRequests.length>=RequestScheduler.maximumRequests)){updatePriority(e);var t=requestHeap.insert(e);if(defined(t)){if(t===e)return;cancelRequest(t)}return issueRequest(e)}}},RequestScheduler.clearForSpecs=function(){for(;requestHeap.length>0;)cancelRequest(requestHeap.pop());for(var e=activeRequests.length,t=0;t<e;++t)cancelRequest(activeRequests[t]);activeRequests.length=0,numberOfActiveRequestsByServer={},statistics.numberOfAttemptedRequests=0,statistics.numberOfActiveRequests=0,statistics.numberOfCancelledRequests=0,statistics.numberOfCancelledActiveRequests=0,statistics.numberOfFailedRequests=0,statistics.numberOfActiveRequestsEver=0,statistics.lastNumberOfActiveRequests=0},RequestScheduler.numberOfActiveRequestsByServer=function(e){return numberOfActiveRequestsByServer[e]},RequestScheduler.requestHeap=requestHeap;export default RequestScheduler;
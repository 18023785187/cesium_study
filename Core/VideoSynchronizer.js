import defaultValue from"./defaultValue.js";import defined from"./defined.js";import destroyObject from"./destroyObject.js";import Iso8601 from"./Iso8601.js";import JulianDate from"./JulianDate.js";function VideoSynchronizer(e){e=defaultValue(e,defaultValue.EMPTY_OBJECT),this._clock=void 0,this._element=void 0,this._clockSubscription=void 0,this._seekFunction=void 0,this._lastPlaybackRate=void 0,this.clock=e.clock,this.element=e.element,this.epoch=defaultValue(e.epoch,Iso8601.MINIMUM_VALUE),this.tolerance=defaultValue(e.tolerance,1),this._seeking=!1,this._seekFunction=void 0,this._firstTickAfterSeek=!1}function createSeekFunction(e){return function(){e._seeking=!1,e._firstTickAfterSeek=!0}}Object.defineProperties(VideoSynchronizer.prototype,{clock:{get:function(){return this._clock},set:function(e){var t=this._clock;t!==e&&(defined(t)&&(this._clockSubscription(),this._clockSubscription=void 0),defined(e)&&(this._clockSubscription=e.onTick.addEventListener(VideoSynchronizer.prototype._onTick,this)),this._clock=e)}},element:{get:function(){return this._element},set:function(e){var t=this._element;t!==e&&(defined(t)&&t.removeEventListener("seeked",this._seekFunction,!1),defined(e)&&(this._seeking=!1,this._seekFunction=createSeekFunction(this),e.addEventListener("seeked",this._seekFunction,!1)),this._element=e,this._seeking=!1,this._firstTickAfterSeek=!1)}}}),VideoSynchronizer.prototype.destroy=function(){return this.element=void 0,this.clock=void 0,destroyObject(this)},VideoSynchronizer.prototype.isDestroyed=function(){return!1},VideoSynchronizer.prototype._trySetPlaybackRate=function(e){if(this._lastPlaybackRate!==e.multiplier){var t=this._element;try{t.playbackRate=e.multiplier}catch(e){t.playbackRate=0}this._lastPlaybackRate=e.multiplier}},VideoSynchronizer.prototype._onTick=function(e){var t=this._element;if(defined(t)&&!(t.readyState<2)){var i=t.paused,n=e.shouldAnimate;if(n===i&&(n?t.play():t.pause()),this._seeking||this._firstTickAfterSeek)this._firstTickAfterSeek=!1;else{this._trySetPlaybackRate(e);var o,s=e.currentTime,r=defaultValue(this.epoch,Iso8601.MINIMUM_VALUE),c=JulianDate.secondsDifference(s,r),a=t.duration,l=t.currentTime;t.loop?((c%=a)<0&&(c=a-c),o=c):o=c>a?a:c<0?0:c;var d=n?defaultValue(this.tolerance,1):.001;Math.abs(o-l)>d&&(this._seeking=!0,t.currentTime=o)}}};export default VideoSynchronizer;
import Clock from"../Core/Clock.js";import defined from"../Core/defined.js";import destroyObject from"../Core/destroyObject.js";import EventHelper from"../Core/EventHelper.js";import JulianDate from"../Core/JulianDate.js";import knockout from"../ThirdParty/knockout.js";function ClockViewModel(e){defined(e)||(e=new Clock),this._clock=e,this._eventHelper=new EventHelper,this._eventHelper.add(e.onTick,this.synchronize,this),this.systemTime=knockout.observable(JulianDate.now()),this.systemTime.equalityComparer=JulianDate.equals,this.startTime=knockout.observable(e.startTime),this.startTime.equalityComparer=JulianDate.equals,this.startTime.subscribe((function(t){e.startTime=t,this.synchronize()}),this),this.stopTime=knockout.observable(e.stopTime),this.stopTime.equalityComparer=JulianDate.equals,this.stopTime.subscribe((function(t){e.stopTime=t,this.synchronize()}),this),this.currentTime=knockout.observable(e.currentTime),this.currentTime.equalityComparer=JulianDate.equals,this.currentTime.subscribe((function(t){e.currentTime=t,this.synchronize()}),this),this.multiplier=knockout.observable(e.multiplier),this.multiplier.subscribe((function(t){e.multiplier=t,this.synchronize()}),this),this.clockStep=knockout.observable(e.clockStep),this.clockStep.subscribe((function(t){e.clockStep=t,this.synchronize()}),this),this.clockRange=knockout.observable(e.clockRange),this.clockRange.subscribe((function(t){e.clockRange=t,this.synchronize()}),this),this.canAnimate=knockout.observable(e.canAnimate),this.canAnimate.subscribe((function(t){e.canAnimate=t,this.synchronize()}),this),this.shouldAnimate=knockout.observable(e.shouldAnimate),this.shouldAnimate.subscribe((function(t){e.shouldAnimate=t,this.synchronize()}),this),knockout.track(this,["systemTime","startTime","stopTime","currentTime","multiplier","clockStep","clockRange","canAnimate","shouldAnimate"])}Object.defineProperties(ClockViewModel.prototype,{clock:{get:function(){return this._clock}}}),ClockViewModel.prototype.synchronize=function(){var e=this._clock;this.systemTime=JulianDate.now(),this.startTime=e.startTime,this.stopTime=e.stopTime,this.currentTime=e.currentTime,this.multiplier=e.multiplier,this.clockStep=e.clockStep,this.clockRange=e.clockRange,this.canAnimate=e.canAnimate,this.shouldAnimate=e.shouldAnimate},ClockViewModel.prototype.isDestroyed=function(){return!1},ClockViewModel.prototype.destroy=function(){this._eventHelper.removeAll(),destroyObject(this)};export default ClockViewModel;
import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Spline from"./Spline.js";function WeightSpline(e){var t=(e=defaultValue(e,defaultValue.EMPTY_OBJECT)).weights,i=e.times;if(Check.defined("weights",t),Check.defined("times",i),Check.typeOf.number.greaterThanOrEquals("weights.length",t.length,3),t.length%i.length!=0)throw new DeveloperError("times.length must be a factor of weights.length.");this._times=i,this._weights=t,this._count=t.length/i.length,this._lastTimeIndex=0}Object.defineProperties(WeightSpline.prototype,{times:{get:function(){return this._times}},weights:{get:function(){return this._weights}}}),WeightSpline.prototype.findTimeInterval=Spline.prototype.findTimeInterval,WeightSpline.prototype.wrapTime=Spline.prototype.wrapTime,WeightSpline.prototype.clampTime=Spline.prototype.clampTime,WeightSpline.prototype.evaluate=function(e,t){var i=this.weights,r=this.times,n=this._lastTimeIndex=this.findTimeInterval(e,this._lastTimeIndex),o=(e-r[n])/(r[n+1]-r[n]);defined(t)||(t=new Array(this._count));for(var h=0;h<this._count;h++){var p=n*this._count+h;t[h]=i[p]*(1-o)+i[p+this._count]*o}return t};export default WeightSpline;
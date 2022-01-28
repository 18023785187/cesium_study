import AxisAlignedBoundingBox from"./AxisAlignedBoundingBox.js";import Cartesian2 from"./Cartesian2.js";import Cartesian3 from"./Cartesian3.js";import Cartesian4 from"./Cartesian4.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Ellipsoid from"./Ellipsoid.js";import IntersectionTests from"./IntersectionTests.js";import Matrix4 from"./Matrix4.js";import Plane from"./Plane.js";import Ray from"./Ray.js";import Transforms from"./Transforms.js";var scratchCart4=new Cartesian4;function EllipsoidTangentPlane(e,t){if(Check.defined("origin",e),e=(t=defaultValue(t,Ellipsoid.WGS84)).scaleToGeodeticSurface(e),!defined(e))throw new DeveloperError("origin must not be at the center of the ellipsoid.");var n=Transforms.eastNorthUpToFixedFrame(e,t);this._ellipsoid=t,this._origin=e,this._xAxis=Cartesian3.fromCartesian4(Matrix4.getColumn(n,0,scratchCart4)),this._yAxis=Cartesian3.fromCartesian4(Matrix4.getColumn(n,1,scratchCart4));var i=Cartesian3.fromCartesian4(Matrix4.getColumn(n,2,scratchCart4));this._plane=Plane.fromPointNormal(e,i)}Object.defineProperties(EllipsoidTangentPlane.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});var tmp=new AxisAlignedBoundingBox;EllipsoidTangentPlane.fromPoints=function(e,t){return Check.defined("cartesians",e),new EllipsoidTangentPlane(AxisAlignedBoundingBox.fromPoints(e,tmp).center,t)};var scratchProjectPointOntoPlaneRay=new Ray,scratchProjectPointOntoPlaneCartesian3=new Cartesian3;EllipsoidTangentPlane.prototype.projectPointOntoPlane=function(e,t){Check.defined("cartesian",e);var n=scratchProjectPointOntoPlaneRay;n.origin=e,Cartesian3.normalize(e,n.direction);var i=IntersectionTests.rayPlane(n,this._plane,scratchProjectPointOntoPlaneCartesian3);if(defined(i)||(Cartesian3.negate(n.direction,n.direction),i=IntersectionTests.rayPlane(n,this._plane,scratchProjectPointOntoPlaneCartesian3)),defined(i)){var r=Cartesian3.subtract(i,this._origin,i),a=Cartesian3.dot(this._xAxis,r),o=Cartesian3.dot(this._yAxis,r);return defined(t)?(t.x=a,t.y=o,t):new Cartesian2(a,o)}},EllipsoidTangentPlane.prototype.projectPointsOntoPlane=function(e,t){Check.defined("cartesians",e),defined(t)||(t=[]);for(var n=0,i=e.length,r=0;r<i;r++){var a=this.projectPointOntoPlane(e[r],t[n]);defined(a)&&(t[n]=a,n++)}return t.length=n,t},EllipsoidTangentPlane.prototype.projectPointToNearestOnPlane=function(e,t){Check.defined("cartesian",e),defined(t)||(t=new Cartesian2);var n=scratchProjectPointOntoPlaneRay;n.origin=e,Cartesian3.clone(this._plane.normal,n.direction);var i=IntersectionTests.rayPlane(n,this._plane,scratchProjectPointOntoPlaneCartesian3);defined(i)||(Cartesian3.negate(n.direction,n.direction),i=IntersectionTests.rayPlane(n,this._plane,scratchProjectPointOntoPlaneCartesian3));var r=Cartesian3.subtract(i,this._origin,i),a=Cartesian3.dot(this._xAxis,r),o=Cartesian3.dot(this._yAxis,r);return t.x=a,t.y=o,t},EllipsoidTangentPlane.prototype.projectPointsToNearestOnPlane=function(e,t){Check.defined("cartesians",e),defined(t)||(t=[]);var n=e.length;t.length=n;for(var i=0;i<n;i++)t[i]=this.projectPointToNearestOnPlane(e[i],t[i]);return t};var projectPointsOntoEllipsoidScratch=new Cartesian3;EllipsoidTangentPlane.prototype.projectPointOntoEllipsoid=function(e,t){Check.defined("cartesian",e),defined(t)||(t=new Cartesian3);var n=this._ellipsoid,i=this._origin,r=this._xAxis,a=this._yAxis,o=projectPointsOntoEllipsoidScratch;return Cartesian3.multiplyByScalar(r,e.x,o),t=Cartesian3.add(i,o,t),Cartesian3.multiplyByScalar(a,e.y,o),Cartesian3.add(t,o,t),n.scaleToGeocentricSurface(t,t),t},EllipsoidTangentPlane.prototype.projectPointsOntoEllipsoid=function(e,t){Check.defined("cartesians",e);var n=e.length;defined(t)?t.length=n:t=new Array(n);for(var i=0;i<n;++i)t[i]=this.projectPointOntoEllipsoid(e[i],t[i]);return t};export default EllipsoidTangentPlane;
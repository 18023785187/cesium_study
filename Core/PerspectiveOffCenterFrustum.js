import Cartesian3 from"./Cartesian3.js";import Cartesian4 from"./Cartesian4.js";import CullingVolume from"./CullingVolume.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import CesiumMath from"./Math.js";import Matrix4 from"./Matrix4.js";function PerspectiveOffCenterFrustum(e){e=defaultValue(e,defaultValue.EMPTY_OBJECT),this.left=e.left,this._left=void 0,this.right=e.right,this._right=void 0,this.top=e.top,this._top=void 0,this.bottom=e.bottom,this._bottom=void 0,this.near=defaultValue(e.near,1),this._near=this.near,this.far=defaultValue(e.far,5e8),this._far=this.far,this._cullingVolume=new CullingVolume,this._perspectiveMatrix=new Matrix4,this._infinitePerspective=new Matrix4}function update(e){if(!(defined(e.right)&&defined(e.left)&&defined(e.top)&&defined(e.bottom)&&defined(e.near)&&defined(e.far)))throw new DeveloperError("right, left, top, bottom, near, or far parameters are not set.");var t=e.top,r=e.bottom,i=e.right,a=e.left,n=e.near,s=e.far;if(t!==e._top||r!==e._bottom||a!==e._left||i!==e._right||n!==e._near||s!==e._far){if(e.near<=0||e.near>e.far)throw new DeveloperError("near must be greater than zero and less than far.");e._left=a,e._right=i,e._top=t,e._bottom=r,e._near=n,e._far=s,e._perspectiveMatrix=Matrix4.computePerspectiveOffCenter(a,i,r,t,n,s,e._perspectiveMatrix),e._infinitePerspective=Matrix4.computeInfinitePerspectiveOffCenter(a,i,r,t,n,e._infinitePerspective)}}Object.defineProperties(PerspectiveOffCenterFrustum.prototype,{projectionMatrix:{get:function(){return update(this),this._perspectiveMatrix}},infiniteProjectionMatrix:{get:function(){return update(this),this._infinitePerspective}}});var getPlanesRight=new Cartesian3,getPlanesNearCenter=new Cartesian3,getPlanesFarCenter=new Cartesian3,getPlanesNormal=new Cartesian3;PerspectiveOffCenterFrustum.prototype.computeCullingVolume=function(e,t,r){if(!defined(e))throw new DeveloperError("position is required.");if(!defined(t))throw new DeveloperError("direction is required.");if(!defined(r))throw new DeveloperError("up is required.");var i=this._cullingVolume.planes,a=this.top,n=this.bottom,s=this.right,o=this.left,f=this.near,l=this.far,u=Cartesian3.cross(t,r,getPlanesRight),d=getPlanesNearCenter;Cartesian3.multiplyByScalar(t,f,d),Cartesian3.add(e,d,d);var p=getPlanesFarCenter;Cartesian3.multiplyByScalar(t,l,p),Cartesian3.add(e,p,p);var h=getPlanesNormal;Cartesian3.multiplyByScalar(u,o,h),Cartesian3.add(d,h,h),Cartesian3.subtract(h,e,h),Cartesian3.normalize(h,h),Cartesian3.cross(h,r,h),Cartesian3.normalize(h,h);var m=i[0];return defined(m)||(m=i[0]=new Cartesian4),m.x=h.x,m.y=h.y,m.z=h.z,m.w=-Cartesian3.dot(h,e),Cartesian3.multiplyByScalar(u,s,h),Cartesian3.add(d,h,h),Cartesian3.subtract(h,e,h),Cartesian3.cross(r,h,h),Cartesian3.normalize(h,h),m=i[1],defined(m)||(m=i[1]=new Cartesian4),m.x=h.x,m.y=h.y,m.z=h.z,m.w=-Cartesian3.dot(h,e),Cartesian3.multiplyByScalar(r,n,h),Cartesian3.add(d,h,h),Cartesian3.subtract(h,e,h),Cartesian3.cross(u,h,h),Cartesian3.normalize(h,h),m=i[2],defined(m)||(m=i[2]=new Cartesian4),m.x=h.x,m.y=h.y,m.z=h.z,m.w=-Cartesian3.dot(h,e),Cartesian3.multiplyByScalar(r,a,h),Cartesian3.add(d,h,h),Cartesian3.subtract(h,e,h),Cartesian3.cross(h,u,h),Cartesian3.normalize(h,h),m=i[3],defined(m)||(m=i[3]=new Cartesian4),m.x=h.x,m.y=h.y,m.z=h.z,m.w=-Cartesian3.dot(h,e),m=i[4],defined(m)||(m=i[4]=new Cartesian4),m.x=t.x,m.y=t.y,m.z=t.z,m.w=-Cartesian3.dot(t,d),Cartesian3.negate(t,h),m=i[5],defined(m)||(m=i[5]=new Cartesian4),m.x=h.x,m.y=h.y,m.z=h.z,m.w=-Cartesian3.dot(h,p),this._cullingVolume},PerspectiveOffCenterFrustum.prototype.getPixelDimensions=function(e,t,r,i,a){if(update(this),!defined(e)||!defined(t))throw new DeveloperError("Both drawingBufferWidth and drawingBufferHeight are required.");if(e<=0)throw new DeveloperError("drawingBufferWidth must be greater than zero.");if(t<=0)throw new DeveloperError("drawingBufferHeight must be greater than zero.");if(!defined(r))throw new DeveloperError("distance is required.");if(!defined(i))throw new DeveloperError("pixelRatio is required");if(i<=0)throw new DeveloperError("pixelRatio must be greater than zero.");if(!defined(a))throw new DeveloperError("A result object is required.");var n=1/this.near,s=this.top*n,o=2*i*r*s/t,f=2*i*r*(s=this.right*n)/e;return a.x=f,a.y=o,a},PerspectiveOffCenterFrustum.prototype.clone=function(e){return defined(e)||(e=new PerspectiveOffCenterFrustum),e.right=this.right,e.left=this.left,e.top=this.top,e.bottom=this.bottom,e.near=this.near,e.far=this.far,e._left=void 0,e._right=void 0,e._top=void 0,e._bottom=void 0,e._near=void 0,e._far=void 0,e},PerspectiveOffCenterFrustum.prototype.equals=function(e){return defined(e)&&e instanceof PerspectiveOffCenterFrustum&&this.right===e.right&&this.left===e.left&&this.top===e.top&&this.bottom===e.bottom&&this.near===e.near&&this.far===e.far},PerspectiveOffCenterFrustum.prototype.equalsEpsilon=function(e,t,r){return e===this||defined(e)&&e instanceof PerspectiveOffCenterFrustum&&CesiumMath.equalsEpsilon(this.right,e.right,t,r)&&CesiumMath.equalsEpsilon(this.left,e.left,t,r)&&CesiumMath.equalsEpsilon(this.top,e.top,t,r)&&CesiumMath.equalsEpsilon(this.bottom,e.bottom,t,r)&&CesiumMath.equalsEpsilon(this.near,e.near,t,r)&&CesiumMath.equalsEpsilon(this.far,e.far,t,r)};export default PerspectiveOffCenterFrustum;
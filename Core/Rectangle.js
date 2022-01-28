import Cartographic from"./Cartographic.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import Ellipsoid from"./Ellipsoid.js";import CesiumMath from"./Math.js";function Rectangle(e,t,a,n){this.west=defaultValue(e,0),this.south=defaultValue(t,0),this.east=defaultValue(a,0),this.north=defaultValue(n,0)}Object.defineProperties(Rectangle.prototype,{width:{get:function(){return Rectangle.computeWidth(this)}},height:{get:function(){return Rectangle.computeHeight(this)}}}),Rectangle.packedLength=4,Rectangle.pack=function(e,t,a){return Check.typeOf.object("value",e),Check.defined("array",t),a=defaultValue(a,0),t[a++]=e.west,t[a++]=e.south,t[a++]=e.east,t[a]=e.north,t},Rectangle.unpack=function(e,t,a){return Check.defined("array",e),t=defaultValue(t,0),defined(a)||(a=new Rectangle),a.west=e[t++],a.south=e[t++],a.east=e[t++],a.north=e[t],a},Rectangle.computeWidth=function(e){Check.typeOf.object("rectangle",e);var t=e.east,a=e.west;return t<a&&(t+=CesiumMath.TWO_PI),t-a},Rectangle.computeHeight=function(e){return Check.typeOf.object("rectangle",e),e.north-e.south},Rectangle.fromDegrees=function(e,t,a,n,u){return e=CesiumMath.toRadians(defaultValue(e,0)),t=CesiumMath.toRadians(defaultValue(t,0)),a=CesiumMath.toRadians(defaultValue(a,0)),n=CesiumMath.toRadians(defaultValue(n,0)),defined(u)?(u.west=e,u.south=t,u.east=a,u.north=n,u):new Rectangle(e,t,a,n)},Rectangle.fromRadians=function(e,t,a,n,u){return defined(u)?(u.west=defaultValue(e,0),u.south=defaultValue(t,0),u.east=defaultValue(a,0),u.north=defaultValue(n,0),u):new Rectangle(e,t,a,n)},Rectangle.fromCartographicArray=function(e,t){Check.defined("cartographics",e);for(var a=Number.MAX_VALUE,n=-Number.MAX_VALUE,u=Number.MAX_VALUE,r=-Number.MAX_VALUE,h=Number.MAX_VALUE,i=-Number.MAX_VALUE,s=0,o=e.length;s<o;s++){var c=e[s];a=Math.min(a,c.longitude),n=Math.max(n,c.longitude),h=Math.min(h,c.latitude),i=Math.max(i,c.latitude);var l=c.longitude>=0?c.longitude:c.longitude+CesiumMath.TWO_PI;u=Math.min(u,l),r=Math.max(r,l)}return n-a>r-u&&(a=u,(n=r)>CesiumMath.PI&&(n-=CesiumMath.TWO_PI),a>CesiumMath.PI&&(a-=CesiumMath.TWO_PI)),defined(t)?(t.west=a,t.south=h,t.east=n,t.north=i,t):new Rectangle(a,h,n,i)},Rectangle.fromCartesianArray=function(e,t,a){Check.defined("cartesians",e),t=defaultValue(t,Ellipsoid.WGS84);for(var n=Number.MAX_VALUE,u=-Number.MAX_VALUE,r=Number.MAX_VALUE,h=-Number.MAX_VALUE,i=Number.MAX_VALUE,s=-Number.MAX_VALUE,o=0,c=e.length;o<c;o++){var l=t.cartesianToCartographic(e[o]);n=Math.min(n,l.longitude),u=Math.max(u,l.longitude),i=Math.min(i,l.latitude),s=Math.max(s,l.latitude);var g=l.longitude>=0?l.longitude:l.longitude+CesiumMath.TWO_PI;r=Math.min(r,g),h=Math.max(h,g)}return u-n>h-r&&(n=r,(u=h)>CesiumMath.PI&&(u-=CesiumMath.TWO_PI),n>CesiumMath.PI&&(n-=CesiumMath.TWO_PI)),defined(a)?(a.west=n,a.south=i,a.east=u,a.north=s,a):new Rectangle(n,i,u,s)},Rectangle.clone=function(e,t){if(defined(e))return defined(t)?(t.west=e.west,t.south=e.south,t.east=e.east,t.north=e.north,t):new Rectangle(e.west,e.south,e.east,e.north)},Rectangle.equalsEpsilon=function(e,t,a){return a=defaultValue(a,0),e===t||defined(e)&&defined(t)&&Math.abs(e.west-t.west)<=a&&Math.abs(e.south-t.south)<=a&&Math.abs(e.east-t.east)<=a&&Math.abs(e.north-t.north)<=a},Rectangle.prototype.clone=function(e){return Rectangle.clone(this,e)},Rectangle.prototype.equals=function(e){return Rectangle.equals(this,e)},Rectangle.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e.west===t.west&&e.south===t.south&&e.east===t.east&&e.north===t.north},Rectangle.prototype.equalsEpsilon=function(e,t){return Rectangle.equalsEpsilon(this,e,t)},Rectangle.validate=function(e){Check.typeOf.object("rectangle",e);var t=e.north;Check.typeOf.number.greaterThanOrEquals("north",t,-CesiumMath.PI_OVER_TWO),Check.typeOf.number.lessThanOrEquals("north",t,CesiumMath.PI_OVER_TWO);var a=e.south;Check.typeOf.number.greaterThanOrEquals("south",a,-CesiumMath.PI_OVER_TWO),Check.typeOf.number.lessThanOrEquals("south",a,CesiumMath.PI_OVER_TWO);var n=e.west;Check.typeOf.number.greaterThanOrEquals("west",n,-Math.PI),Check.typeOf.number.lessThanOrEquals("west",n,Math.PI);var u=e.east;Check.typeOf.number.greaterThanOrEquals("east",u,-Math.PI),Check.typeOf.number.lessThanOrEquals("east",u,Math.PI)},Rectangle.southwest=function(e,t){return Check.typeOf.object("rectangle",e),defined(t)?(t.longitude=e.west,t.latitude=e.south,t.height=0,t):new Cartographic(e.west,e.south)},Rectangle.northwest=function(e,t){return Check.typeOf.object("rectangle",e),defined(t)?(t.longitude=e.west,t.latitude=e.north,t.height=0,t):new Cartographic(e.west,e.north)},Rectangle.northeast=function(e,t){return Check.typeOf.object("rectangle",e),defined(t)?(t.longitude=e.east,t.latitude=e.north,t.height=0,t):new Cartographic(e.east,e.north)},Rectangle.southeast=function(e,t){return Check.typeOf.object("rectangle",e),defined(t)?(t.longitude=e.east,t.latitude=e.south,t.height=0,t):new Cartographic(e.east,e.south)},Rectangle.center=function(e,t){Check.typeOf.object("rectangle",e);var a=e.east,n=e.west;a<n&&(a+=CesiumMath.TWO_PI);var u=CesiumMath.negativePiToPi(.5*(n+a)),r=.5*(e.south+e.north);return defined(t)?(t.longitude=u,t.latitude=r,t.height=0,t):new Cartographic(u,r)},Rectangle.intersection=function(e,t,a){Check.typeOf.object("rectangle",e),Check.typeOf.object("otherRectangle",t);var n=e.east,u=e.west,r=t.east,h=t.west;n<u&&r>0?n+=CesiumMath.TWO_PI:r<h&&n>0&&(r+=CesiumMath.TWO_PI),n<u&&h<0?h+=CesiumMath.TWO_PI:r<h&&u<0&&(u+=CesiumMath.TWO_PI);var i=CesiumMath.negativePiToPi(Math.max(u,h)),s=CesiumMath.negativePiToPi(Math.min(n,r));if(!((e.west<e.east||t.west<t.east)&&s<=i)){var o=Math.max(e.south,t.south),c=Math.min(e.north,t.north);if(!(o>=c))return defined(a)?(a.west=i,a.south=o,a.east=s,a.north=c,a):new Rectangle(i,o,s,c)}},Rectangle.simpleIntersection=function(e,t,a){Check.typeOf.object("rectangle",e),Check.typeOf.object("otherRectangle",t);var n=Math.max(e.west,t.west),u=Math.max(e.south,t.south),r=Math.min(e.east,t.east),h=Math.min(e.north,t.north);if(!(u>=h||n>=r))return defined(a)?(a.west=n,a.south=u,a.east=r,a.north=h,a):new Rectangle(n,u,r,h)},Rectangle.union=function(e,t,a){Check.typeOf.object("rectangle",e),Check.typeOf.object("otherRectangle",t),defined(a)||(a=new Rectangle);var n=e.east,u=e.west,r=t.east,h=t.west;n<u&&r>0?n+=CesiumMath.TWO_PI:r<h&&n>0&&(r+=CesiumMath.TWO_PI),n<u&&h<0?h+=CesiumMath.TWO_PI:r<h&&u<0&&(u+=CesiumMath.TWO_PI);var i=CesiumMath.negativePiToPi(Math.min(u,h)),s=CesiumMath.negativePiToPi(Math.max(n,r));return a.west=i,a.south=Math.min(e.south,t.south),a.east=s,a.north=Math.max(e.north,t.north),a},Rectangle.expand=function(e,t,a){return Check.typeOf.object("rectangle",e),Check.typeOf.object("cartographic",t),defined(a)||(a=new Rectangle),a.west=Math.min(e.west,t.longitude),a.south=Math.min(e.south,t.latitude),a.east=Math.max(e.east,t.longitude),a.north=Math.max(e.north,t.latitude),a},Rectangle.contains=function(e,t){Check.typeOf.object("rectangle",e),Check.typeOf.object("cartographic",t);var a=t.longitude,n=t.latitude,u=e.west,r=e.east;return r<u&&(r+=CesiumMath.TWO_PI,a<0&&(a+=CesiumMath.TWO_PI)),(a>u||CesiumMath.equalsEpsilon(a,u,CesiumMath.EPSILON14))&&(a<r||CesiumMath.equalsEpsilon(a,r,CesiumMath.EPSILON14))&&n>=e.south&&n<=e.north};var subsampleLlaScratch=new Cartographic;Rectangle.subsample=function(e,t,a,n){Check.typeOf.object("rectangle",e),t=defaultValue(t,Ellipsoid.WGS84),a=defaultValue(a,0),defined(n)||(n=[]);var u=0,r=e.north,h=e.south,i=e.east,s=e.west,o=subsampleLlaScratch;o.height=a,o.longitude=s,o.latitude=r,n[u]=t.cartographicToCartesian(o,n[u]),u++,o.longitude=i,n[u]=t.cartographicToCartesian(o,n[u]),u++,o.latitude=h,n[u]=t.cartographicToCartesian(o,n[u]),u++,o.longitude=s,n[u]=t.cartographicToCartesian(o,n[u]),u++,o.latitude=r<0?r:h>0?h:0;for(var c=1;c<8;++c)o.longitude=-Math.PI+c*CesiumMath.PI_OVER_TWO,Rectangle.contains(e,o)&&(n[u]=t.cartographicToCartesian(o,n[u]),u++);return 0===o.latitude&&(o.longitude=s,n[u]=t.cartographicToCartesian(o,n[u]),u++,o.longitude=i,n[u]=t.cartographicToCartesian(o,n[u]),u++),n.length=u,n},Rectangle.MAX_VALUE=Object.freeze(new Rectangle(-Math.PI,-CesiumMath.PI_OVER_TWO,Math.PI,CesiumMath.PI_OVER_TWO));export default Rectangle;
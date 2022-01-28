import AttributeCompression from"./AttributeCompression.js";import Cartesian3 from"./Cartesian3.js";import Cartographic from"./Cartographic.js";import CesiumMath from"./Math.js";var maxShort=32767,scratchBVCartographic=new Cartographic,scratchEncodedPosition=new Cartesian3;function decodeVectorPolylinePositions(r,a,t,o,e){var i=r.length/3,s=r.subarray(0,i),n=r.subarray(i,2*i),c=r.subarray(2*i,3*i);AttributeCompression.zigZagDeltaDecode(s,n,c);for(var h=new Float64Array(r.length),m=0;m<i;++m){var p=s[m],C=n[m],u=c[m],l=CesiumMath.lerp(a.west,a.east,p/maxShort),d=CesiumMath.lerp(a.south,a.north,C/maxShort),g=CesiumMath.lerp(t,o,u/maxShort),f=Cartographic.fromRadians(l,d,g,scratchBVCartographic),b=e.cartographicToCartesian(f,scratchEncodedPosition);Cartesian3.pack(b,h,3*m)}return h}export default decodeVectorPolylinePositions;
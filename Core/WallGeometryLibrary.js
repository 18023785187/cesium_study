import arrayRemoveDuplicates from"./arrayRemoveDuplicates.js";import Cartesian3 from"./Cartesian3.js";import Cartographic from"./Cartographic.js";import defined from"./defined.js";import CesiumMath from"./Math.js";import PolylinePipeline from"./PolylinePipeline.js";var WallGeometryLibrary={};function latLonEquals(e,r){return CesiumMath.equalsEpsilon(e.latitude,r.latitude,CesiumMath.EPSILON10)&&CesiumMath.equalsEpsilon(e.longitude,r.longitude,CesiumMath.EPSILON10)}var scratchCartographic1=new Cartographic,scratchCartographic2=new Cartographic;function removeDuplicates(e,r,i,t){var a=(r=arrayRemoveDuplicates(r,Cartesian3.equalsEpsilon)).length;if(!(a<2)){var o=defined(t),n=defined(i),s=new Array(a),h=new Array(a),l=new Array(a),c=r[0];s[0]=c;var p=e.cartesianToCartographic(c,scratchCartographic1);n&&(p.height=i[0]),h[0]=p.height,l[0]=o?t[0]:0;for(var g=h[0]===l[0],m=1,u=1;u<a;++u){var y=r[u],d=e.cartesianToCartographic(y,scratchCartographic2);n&&(d.height=i[u]),g=g&&0===d.height,latLonEquals(p,d)?p.height<d.height&&(h[m-1]=d.height):(s[m]=y,h[m]=d.height,l[m]=o?t[u]:0,g=g&&h[m]===l[m],Cartographic.clone(d,p),++m)}if(!(g||m<2))return s.length=m,h.length=m,l.length=m,{positions:s,topHeights:h,bottomHeights:l}}}var positionsArrayScratch=new Array(2),heightsArrayScratch=new Array(2),generateArcOptionsScratch={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};WallGeometryLibrary.computePositions=function(e,r,i,t,a,o){var n=removeDuplicates(e,r,i,t);if(defined(n)){r=n.positions,i=n.topHeights,t=n.bottomHeights;var s,h,l=r.length,c=l-2,p=CesiumMath.chordLength(a,e.maximumRadius),g=generateArcOptionsScratch;if(g.minDistance=p,g.ellipsoid=e,o){var m,u=0;for(m=0;m<l-1;m++)u+=PolylinePipeline.numberOfPoints(r[m],r[m+1],p)+1;s=new Float64Array(3*u),h=new Float64Array(3*u);var y=positionsArrayScratch,d=heightsArrayScratch;g.positions=y,g.height=d;var f=0;for(m=0;m<l-1;m++){y[0]=r[m],y[1]=r[m+1],d[0]=i[m],d[1]=i[m+1];var v=PolylinePipeline.generateArc(g);s.set(v,f),d[0]=t[m],d[1]=t[m+1],h.set(PolylinePipeline.generateArc(g),f),f+=v.length}}else g.positions=r,g.height=i,s=new Float64Array(PolylinePipeline.generateArc(g)),g.height=t,h=new Float64Array(PolylinePipeline.generateArc(g));return{bottomPositions:h,topPositions:s,numCorners:c}}};export default WallGeometryLibrary;
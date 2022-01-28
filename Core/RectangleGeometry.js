import arrayFill from"./arrayFill.js";import BoundingSphere from"./BoundingSphere.js";import Cartesian2 from"./Cartesian2.js";import Cartesian3 from"./Cartesian3.js";import Cartographic from"./Cartographic.js";import Check from"./Check.js";import ComponentDatatype from"./ComponentDatatype.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Ellipsoid from"./Ellipsoid.js";import Geometry from"./Geometry.js";import GeometryAttribute from"./GeometryAttribute.js";import GeometryAttributes from"./GeometryAttributes.js";import GeometryInstance from"./GeometryInstance.js";import GeometryOffsetAttribute from"./GeometryOffsetAttribute.js";import GeometryPipeline from"./GeometryPipeline.js";import IndexDatatype from"./IndexDatatype.js";import CesiumMath from"./Math.js";import Matrix2 from"./Matrix2.js";import Matrix3 from"./Matrix3.js";import PolygonPipeline from"./PolygonPipeline.js";import PrimitiveType from"./PrimitiveType.js";import Quaternion from"./Quaternion.js";import Rectangle from"./Rectangle.js";import RectangleGeometryLibrary from"./RectangleGeometryLibrary.js";import VertexFormat from"./VertexFormat.js";var positionScratch=new Cartesian3,normalScratch=new Cartesian3,tangentScratch=new Cartesian3,bitangentScratch=new Cartesian3,rectangleScratch=new Rectangle,stScratch=new Cartesian2,bottomBoundingSphere=new BoundingSphere,topBoundingSphere=new BoundingSphere;function createAttributes(t,e){var a=new Geometry({attributes:new GeometryAttributes,primitiveType:PrimitiveType.TRIANGLES});return a.attributes.position=new GeometryAttribute({componentDatatype:ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e.positions}),t.normal&&(a.attributes.normal=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.normals})),t.tangent&&(a.attributes.tangent=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.tangents})),t.bitangent&&(a.attributes.bitangent=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.bitangents})),a}function calculateAttributes(t,e,a,r){var o=t.length,n=e.normal?new Float32Array(o):void 0,i=e.tangent?new Float32Array(o):void 0,s=e.bitangent?new Float32Array(o):void 0,l=0,c=bitangentScratch,u=tangentScratch,m=normalScratch;if(e.normal||e.tangent||e.bitangent)for(var p=0;p<o;p+=3){var g=Cartesian3.fromArray(t,p,positionScratch),d=l+1,h=l+2;m=a.geodeticSurfaceNormal(g,m),(e.tangent||e.bitangent)&&(Cartesian3.cross(Cartesian3.UNIT_Z,m,u),Matrix3.multiplyByVector(r,u,u),Cartesian3.normalize(u,u),e.bitangent&&Cartesian3.normalize(Cartesian3.cross(m,u,c),c)),e.normal&&(n[l]=m.x,n[d]=m.y,n[h]=m.z),e.tangent&&(i[l]=u.x,i[d]=u.y,i[h]=u.z),e.bitangent&&(s[l]=c.x,s[d]=c.y,s[h]=c.z),l+=3}return createAttributes(e,{positions:t,normals:n,tangents:i,bitangents:s})}var v1Scratch=new Cartesian3,v2Scratch=new Cartesian3;function calculateAttributesWall(t,e,a){var r=t.length,o=e.normal?new Float32Array(r):void 0,n=e.tangent?new Float32Array(r):void 0,i=e.bitangent?new Float32Array(r):void 0,s=0,l=0,c=0,u=!0,m=bitangentScratch,p=tangentScratch,g=normalScratch;if(e.normal||e.tangent||e.bitangent)for(var d=0;d<r;d+=6){var h=Cartesian3.fromArray(t,d,positionScratch),y=Cartesian3.fromArray(t,(d+6)%r,v1Scratch);if(u){var f=Cartesian3.fromArray(t,(d+3)%r,v2Scratch);Cartesian3.subtract(y,h,y),Cartesian3.subtract(f,h,f),g=Cartesian3.normalize(Cartesian3.cross(f,y,g),g),u=!1}Cartesian3.equalsEpsilon(y,h,CesiumMath.EPSILON10)&&(u=!0),(e.tangent||e.bitangent)&&(m=a.geodeticSurfaceNormal(h,m),e.tangent&&(p=Cartesian3.normalize(Cartesian3.cross(m,g,p),p))),e.normal&&(o[s++]=g.x,o[s++]=g.y,o[s++]=g.z,o[s++]=g.x,o[s++]=g.y,o[s++]=g.z),e.tangent&&(n[l++]=p.x,n[l++]=p.y,n[l++]=p.z,n[l++]=p.x,n[l++]=p.y,n[l++]=p.z),e.bitangent&&(i[c++]=m.x,i[c++]=m.y,i[c++]=m.z,i[c++]=m.x,i[c++]=m.y,i[c++]=m.z)}return createAttributes(e,{positions:t,normals:o,tangents:n,bitangents:i})}function constructRectangle(t,e){var a=t._vertexFormat,r=t._ellipsoid,o=e.height,n=e.width,i=e.northCap,s=e.southCap,l=0,c=o,u=o,m=0;i&&(l=1,u-=1,m+=1),s&&(c-=1,u-=1,m+=1),m+=n*u;for(var p=a.position?new Float64Array(3*m):void 0,g=a.st?new Float32Array(2*m):void 0,d=0,h=0,y=positionScratch,f=stScratch,v=Number.MAX_VALUE,b=Number.MAX_VALUE,x=-Number.MAX_VALUE,A=-Number.MAX_VALUE,_=l;_<c;++_)for(var C=0;C<n;++C)RectangleGeometryLibrary.computePosition(e,r,a.st,_,C,y,f),p[d++]=y.x,p[d++]=y.y,p[d++]=y.z,a.st&&(g[h++]=f.x,g[h++]=f.y,v=Math.min(v,f.x),b=Math.min(b,f.y),x=Math.max(x,f.x),A=Math.max(A,f.y));if(i&&(RectangleGeometryLibrary.computePosition(e,r,a.st,0,0,y,f),p[d++]=y.x,p[d++]=y.y,p[d++]=y.z,a.st&&(g[h++]=f.x,g[h++]=f.y,v=f.x,b=f.y,x=f.x,A=f.y)),s&&(RectangleGeometryLibrary.computePosition(e,r,a.st,o-1,0,y,f),p[d++]=y.x,p[d++]=y.y,p[d]=y.z,a.st&&(g[h++]=f.x,g[h]=f.y,v=Math.min(v,f.x),b=Math.min(b,f.y),x=Math.max(x,f.x),A=Math.max(A,f.y))),a.st&&(v<0||b<0||x>1||A>1))for(var R=0;R<g.length;R+=2)g[R]=(g[R]-v)/(x-v),g[R+1]=(g[R+1]-b)/(A-b);var w=calculateAttributes(p,a,r,e.tangentRotationMatrix),S=6*(n-1)*(u-1);i&&(S+=3*(n-1)),s&&(S+=3*(n-1));var G,P=IndexDatatype.createTypedArray(m,S),E=0,F=0;for(G=0;G<u-1;++G){for(var D=0;D<n-1;++D){var V=E,O=V+n,T=O+1,M=V+1;P[F++]=V,P[F++]=O,P[F++]=M,P[F++]=M,P[F++]=O,P[F++]=T,++E}++E}if(i||s){var L,N,j=m-1,k=m-1;if(i&&s&&(j=m-2),E=0,i)for(G=0;G<n-1;G++)N=(L=E)+1,P[F++]=j,P[F++]=L,P[F++]=N,++E;if(s)for(E=(u-1)*n,G=0;G<n-1;G++)N=(L=E)+1,P[F++]=L,P[F++]=k,P[F++]=N,++E}return w.indices=P,a.st&&(w.attributes.st=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:2,values:g})),w}function addWallPositions(t,e,a,r,o){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a+2],t[e++]=o[a],t[e++]=o[a+1],t[e]=o[a+2],t}function addWallTextureCoordinates(t,e,a,r){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a],t[e]=r[a+1],t}var scratchVertexFormat=new VertexFormat;function constructExtrudedRectangle(t,e){var a,r=t._shadowVolume,o=t._offsetAttribute,n=t._vertexFormat,i=t._extrudedHeight,s=t._surfaceHeight,l=t._ellipsoid,c=e.height,u=e.width;if(r){var m=VertexFormat.clone(n,scratchVertexFormat);m.normal=!0,t._vertexFormat=m}var p=constructRectangle(t,e);r&&(t._vertexFormat=n);var g=PolygonPipeline.scaleToGeodeticHeight(p.attributes.position.values,s,l,!1),d=(g=new Float64Array(g)).length,h=2*d,y=new Float64Array(h);y.set(g);var f=PolygonPipeline.scaleToGeodeticHeight(p.attributes.position.values,i,l);y.set(f,d),p.attributes.position.values=y;var v,b,x,A=n.normal?new Float32Array(h):void 0,_=n.tangent?new Float32Array(h):void 0,C=n.bitangent?new Float32Array(h):void 0,R=n.st?new Float32Array(h/3*2):void 0;if(n.normal){for(b=p.attributes.normal.values,A.set(b),a=0;a<d;a++)b[a]=-b[a];A.set(b,d),p.attributes.normal.values=A}if(r){b=p.attributes.normal.values,n.normal||(p.attributes.normal=void 0);var w=new Float32Array(h);for(a=0;a<d;a++)b[a]=-b[a];w.set(b,d),p.attributes.extrudeDirection=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w})}var S=defined(o);if(S){var G=d/3*2,P=new Uint8Array(G);o===GeometryOffsetAttribute.TOP?P=arrayFill(P,1,0,G/2):(x=o===GeometryOffsetAttribute.NONE?0:1,P=arrayFill(P,x)),p.attributes.applyOffset=new GeometryAttribute({componentDatatype:ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:P})}if(n.tangent){var E=p.attributes.tangent.values;for(_.set(E),a=0;a<d;a++)E[a]=-E[a];_.set(E,d),p.attributes.tangent.values=_}if(n.bitangent){var F=p.attributes.bitangent.values;C.set(F),C.set(F,d),p.attributes.bitangent.values=C}n.st&&(v=p.attributes.st.values,R.set(v),R.set(v,d/3*2),p.attributes.st.values=R);var D=p.indices,V=D.length,O=d/3,T=IndexDatatype.createTypedArray(h/3,2*V);for(T.set(D),a=0;a<V;a+=3)T[a+V]=D[a+2]+O,T[a+1+V]=D[a+1]+O,T[a+2+V]=D[a]+O;p.indices=T;var M=e.northCap,L=e.southCap,N=c,j=2,k=0,I=4,B=4;M&&(j-=1,N-=1,k+=1,I-=2,B-=1),L&&(j-=1,N-=1,k+=1,I-=2,B-=1);var H=2*((k+=j*u+2*N-I)+B),W=new Float64Array(3*H),z=r?new Float32Array(3*H):void 0,U=S?new Uint8Array(H):void 0,q=n.st?new Float32Array(2*H):void 0,Y=o===GeometryOffsetAttribute.TOP;S&&!Y&&(x=o===GeometryOffsetAttribute.ALL?1:0,U=arrayFill(U,x));var Q,X=0,J=0,Z=0,K=0,$=u*N;for(a=0;a<$;a+=u)W=addWallPositions(W,X,Q=3*a,g,f),X+=6,n.st&&(q=addWallTextureCoordinates(q,J,2*a,v),J+=4),r&&(Z+=3,z[Z++]=b[Q],z[Z++]=b[Q+1],z[Z++]=b[Q+2]),Y&&(U[K++]=1,K+=1);if(L){var tt=M?$+1:$;for(Q=3*tt,a=0;a<2;a++)W=addWallPositions(W,X,Q,g,f),X+=6,n.st&&(q=addWallTextureCoordinates(q,J,2*tt,v),J+=4),r&&(Z+=3,z[Z++]=b[Q],z[Z++]=b[Q+1],z[Z++]=b[Q+2]),Y&&(U[K++]=1,K+=1)}else for(a=$-u;a<$;a++)W=addWallPositions(W,X,Q=3*a,g,f),X+=6,n.st&&(q=addWallTextureCoordinates(q,J,2*a,v),J+=4),r&&(Z+=3,z[Z++]=b[Q],z[Z++]=b[Q+1],z[Z++]=b[Q+2]),Y&&(U[K++]=1,K+=1);for(a=$-1;a>0;a-=u)W=addWallPositions(W,X,Q=3*a,g,f),X+=6,n.st&&(q=addWallTextureCoordinates(q,J,2*a,v),J+=4),r&&(Z+=3,z[Z++]=b[Q],z[Z++]=b[Q+1],z[Z++]=b[Q+2]),Y&&(U[K++]=1,K+=1);if(M){var et=$;for(Q=3*et,a=0;a<2;a++)W=addWallPositions(W,X,Q,g,f),X+=6,n.st&&(q=addWallTextureCoordinates(q,J,2*et,v),J+=4),r&&(Z+=3,z[Z++]=b[Q],z[Z++]=b[Q+1],z[Z++]=b[Q+2]),Y&&(U[K++]=1,K+=1)}else for(a=u-1;a>=0;a--)W=addWallPositions(W,X,Q=3*a,g,f),X+=6,n.st&&(q=addWallTextureCoordinates(q,J,2*a,v),J+=4),r&&(Z+=3,z[Z++]=b[Q],z[Z++]=b[Q+1],z[Z++]=b[Q+2]),Y&&(U[K++]=1,K+=1);var at=calculateAttributesWall(W,n,l);n.st&&(at.attributes.st=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:2,values:q})),r&&(at.attributes.extrudeDirection=new GeometryAttribute({componentDatatype:ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z})),S&&(at.attributes.applyOffset=new GeometryAttribute({componentDatatype:ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:U}));var rt,ot,nt,it,st=IndexDatatype.createTypedArray(H,6*k);d=W.length/3;var lt=0;for(a=0;a<d-1;a+=2){it=((rt=a)+2)%d;var ct=Cartesian3.fromArray(W,3*rt,v1Scratch),ut=Cartesian3.fromArray(W,3*it,v2Scratch);Cartesian3.equalsEpsilon(ct,ut,CesiumMath.EPSILON10)||(nt=(2+(ot=(rt+1)%d))%d,st[lt++]=rt,st[lt++]=ot,st[lt++]=it,st[lt++]=it,st[lt++]=ot,st[lt++]=nt)}return at.indices=st,(at=GeometryPipeline.combineInstances([new GeometryInstance({geometry:p}),new GeometryInstance({geometry:at})]))[0]}var scratchRectanglePoints=[new Cartesian3,new Cartesian3,new Cartesian3,new Cartesian3],nwScratch=new Cartographic,stNwScratch=new Cartographic;function computeRectangle(t,e,a,r,o){if(0===a)return Rectangle.clone(t,o);var n=RectangleGeometryLibrary.computeOptions(t,e,a,0,rectangleScratch,nwScratch),i=n.height,s=n.width,l=scratchRectanglePoints;return RectangleGeometryLibrary.computePosition(n,r,!1,0,0,l[0]),RectangleGeometryLibrary.computePosition(n,r,!1,0,s-1,l[1]),RectangleGeometryLibrary.computePosition(n,r,!1,i-1,0,l[2]),RectangleGeometryLibrary.computePosition(n,r,!1,i-1,s-1,l[3]),Rectangle.fromCartesianArray(l,r,o)}function RectangleGeometry(t){var e=(t=defaultValue(t,defaultValue.EMPTY_OBJECT)).rectangle;if(Check.typeOf.object("rectangle",e),Rectangle.validate(e),e.north<e.south)throw new DeveloperError("options.rectangle.north must be greater than or equal to options.rectangle.south");var a=defaultValue(t.height,0),r=defaultValue(t.extrudedHeight,a);this._rectangle=Rectangle.clone(e),this._granularity=defaultValue(t.granularity,CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=Ellipsoid.clone(defaultValue(t.ellipsoid,Ellipsoid.WGS84)),this._surfaceHeight=Math.max(a,r),this._rotation=defaultValue(t.rotation,0),this._stRotation=defaultValue(t.stRotation,0),this._vertexFormat=VertexFormat.clone(defaultValue(t.vertexFormat,VertexFormat.DEFAULT)),this._extrudedHeight=Math.min(a,r),this._shadowVolume=defaultValue(t.shadowVolume,!1),this._workerName="createRectangleGeometry",this._offsetAttribute=t.offsetAttribute,this._rotatedRectangle=void 0,this._textureCoordinateRotationPoints=void 0}RectangleGeometry.packedLength=Rectangle.packedLength+Ellipsoid.packedLength+VertexFormat.packedLength+7,RectangleGeometry.pack=function(t,e,a){return Check.typeOf.object("value",t),Check.defined("array",e),a=defaultValue(a,0),Rectangle.pack(t._rectangle,e,a),a+=Rectangle.packedLength,Ellipsoid.pack(t._ellipsoid,e,a),a+=Ellipsoid.packedLength,VertexFormat.pack(t._vertexFormat,e,a),a+=VertexFormat.packedLength,e[a++]=t._granularity,e[a++]=t._surfaceHeight,e[a++]=t._rotation,e[a++]=t._stRotation,e[a++]=t._extrudedHeight,e[a++]=t._shadowVolume?1:0,e[a]=defaultValue(t._offsetAttribute,-1),e};var scratchRectangle=new Rectangle,scratchEllipsoid=Ellipsoid.clone(Ellipsoid.UNIT_SPHERE),scratchOptions={rectangle:scratchRectangle,ellipsoid:scratchEllipsoid,vertexFormat:scratchVertexFormat,granularity:void 0,height:void 0,rotation:void 0,stRotation:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};RectangleGeometry.unpack=function(t,e,a){Check.defined("array",t),e=defaultValue(e,0);var r=Rectangle.unpack(t,e,scratchRectangle);e+=Rectangle.packedLength;var o=Ellipsoid.unpack(t,e,scratchEllipsoid);e+=Ellipsoid.packedLength;var n=VertexFormat.unpack(t,e,scratchVertexFormat);e+=VertexFormat.packedLength;var i=t[e++],s=t[e++],l=t[e++],c=t[e++],u=t[e++],m=1===t[e++],p=t[e];return defined(a)?(a._rectangle=Rectangle.clone(r,a._rectangle),a._ellipsoid=Ellipsoid.clone(o,a._ellipsoid),a._vertexFormat=VertexFormat.clone(n,a._vertexFormat),a._granularity=i,a._surfaceHeight=s,a._rotation=l,a._stRotation=c,a._extrudedHeight=u,a._shadowVolume=m,a._offsetAttribute=-1===p?void 0:p,a):(scratchOptions.granularity=i,scratchOptions.height=s,scratchOptions.rotation=l,scratchOptions.stRotation=c,scratchOptions.extrudedHeight=u,scratchOptions.shadowVolume=m,scratchOptions.offsetAttribute=-1===p?void 0:p,new RectangleGeometry(scratchOptions))},RectangleGeometry.computeRectangle=function(t,e){var a=(t=defaultValue(t,defaultValue.EMPTY_OBJECT)).rectangle;if(Check.typeOf.object("rectangle",a),Rectangle.validate(a),a.north<a.south)throw new DeveloperError("options.rectangle.north must be greater than or equal to options.rectangle.south");var r=defaultValue(t.granularity,CesiumMath.RADIANS_PER_DEGREE),o=defaultValue(t.ellipsoid,Ellipsoid.WGS84);return computeRectangle(a,r,defaultValue(t.rotation,0),o,e)};var tangentRotationMatrixScratch=new Matrix3,quaternionScratch=new Quaternion,centerScratch=new Cartographic;RectangleGeometry.createGeometry=function(t){if(!CesiumMath.equalsEpsilon(t._rectangle.north,t._rectangle.south,CesiumMath.EPSILON10)&&!CesiumMath.equalsEpsilon(t._rectangle.east,t._rectangle.west,CesiumMath.EPSILON10)){var e=t._rectangle,a=t._ellipsoid,r=t._rotation,o=t._stRotation,n=t._vertexFormat,i=RectangleGeometryLibrary.computeOptions(e,t._granularity,r,o,rectangleScratch,nwScratch,stNwScratch),s=tangentRotationMatrixScratch;if(0!==o||0!==r){var l=Rectangle.center(e,centerScratch),c=a.geodeticSurfaceNormalCartographic(l,v1Scratch);Quaternion.fromAxisAngle(c,-o,quaternionScratch),Matrix3.fromQuaternion(quaternionScratch,s)}else Matrix3.clone(Matrix3.IDENTITY,s);var u,m,p=t._surfaceHeight,g=t._extrudedHeight,d=!CesiumMath.equalsEpsilon(p,g,0,CesiumMath.EPSILON2);if(i.lonScalar=1/t._rectangle.width,i.latScalar=1/t._rectangle.height,i.tangentRotationMatrix=s,e=t._rectangle,d){u=constructExtrudedRectangle(t,i);var h=BoundingSphere.fromRectangle3D(e,a,p,topBoundingSphere),y=BoundingSphere.fromRectangle3D(e,a,g,bottomBoundingSphere);m=BoundingSphere.union(h,y)}else{if((u=constructRectangle(t,i)).attributes.position.values=PolygonPipeline.scaleToGeodeticHeight(u.attributes.position.values,p,a,!1),defined(t._offsetAttribute)){var f=u.attributes.position.values.length,v=new Uint8Array(f/3),b=t._offsetAttribute===GeometryOffsetAttribute.NONE?0:1;arrayFill(v,b),u.attributes.applyOffset=new GeometryAttribute({componentDatatype:ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:v})}m=BoundingSphere.fromRectangle3D(e,a,p)}return n.position||delete u.attributes.position,new Geometry({attributes:u.attributes,indices:u.indices,primitiveType:u.primitiveType,boundingSphere:m,offsetAttribute:t._offsetAttribute})}},RectangleGeometry.createShadowVolume=function(t,e,a){var r=t._granularity,o=t._ellipsoid,n=e(r,o),i=a(r,o);return new RectangleGeometry({rectangle:t._rectangle,rotation:t._rotation,ellipsoid:o,stRotation:t._stRotation,granularity:r,extrudedHeight:i,height:n,vertexFormat:VertexFormat.POSITION_ONLY,shadowVolume:!0})};var unrotatedTextureRectangleScratch=new Rectangle,points2DScratch=[new Cartesian2,new Cartesian2,new Cartesian2],rotation2DScratch=new Matrix2,rectangleCenterScratch=new Cartographic;function textureCoordinateRotationPoints(t){if(0===t._stRotation)return[0,0,0,1,1,0];var e=Rectangle.clone(t._rectangle,unrotatedTextureRectangleScratch),a=t._granularity,r=t._ellipsoid,o=computeRectangle(e,a,t._rotation-t._stRotation,r,unrotatedTextureRectangleScratch),n=points2DScratch;n[0].x=o.west,n[0].y=o.south,n[1].x=o.west,n[1].y=o.north,n[2].x=o.east,n[2].y=o.south;for(var i=t.rectangle,s=Matrix2.fromRotation(t._stRotation,rotation2DScratch),l=Rectangle.center(i,rectangleCenterScratch),c=0;c<3;++c){var u=n[c];u.x-=l.longitude,u.y-=l.latitude,Matrix2.multiplyByVector(s,u,u),u.x+=l.longitude,u.y+=l.latitude,u.x=(u.x-i.west)/i.width,u.y=(u.y-i.south)/i.height}var m=n[0],p=n[1],g=n[2],d=new Array(6);return Cartesian2.pack(m,d),Cartesian2.pack(p,d,2),Cartesian2.pack(g,d,4),d}Object.defineProperties(RectangleGeometry.prototype,{rectangle:{get:function(){return defined(this._rotatedRectangle)||(this._rotatedRectangle=computeRectangle(this._rectangle,this._granularity,this._rotation,this._ellipsoid)),this._rotatedRectangle}},textureCoordinateRotationPoints:{get:function(){return defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=textureCoordinateRotationPoints(this)),this._textureCoordinateRotationPoints}}});export default RectangleGeometry;
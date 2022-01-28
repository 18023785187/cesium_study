import Cartesian3 from"./Cartesian3.js";import Check from"./Check.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import EllipseGeometry from"./EllipseGeometry.js";import Ellipsoid from"./Ellipsoid.js";import VertexFormat from"./VertexFormat.js";function CircleGeometry(e){var t=(e=defaultValue(e,defaultValue.EMPTY_OBJECT)).radius;Check.typeOf.number("radius",t);var r={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new EllipseGeometry(r),this._workerName="createCircleGeometry"}CircleGeometry.packedLength=EllipseGeometry.packedLength,CircleGeometry.pack=function(e,t,r){return Check.typeOf.object("value",e),EllipseGeometry.pack(e._ellipseGeometry,t,r)};var scratchEllipseGeometry=new EllipseGeometry({center:new Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),scratchOptions={center:new Cartesian3,radius:void 0,ellipsoid:Ellipsoid.clone(Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};CircleGeometry.unpack=function(e,t,r){var i=EllipseGeometry.unpack(e,t,scratchEllipseGeometry);return scratchOptions.center=Cartesian3.clone(i._center,scratchOptions.center),scratchOptions.ellipsoid=Ellipsoid.clone(i._ellipsoid,scratchOptions.ellipsoid),scratchOptions.height=i._height,scratchOptions.extrudedHeight=i._extrudedHeight,scratchOptions.granularity=i._granularity,scratchOptions.vertexFormat=VertexFormat.clone(i._vertexFormat,scratchOptions.vertexFormat),scratchOptions.stRotation=i._stRotation,scratchOptions.shadowVolume=i._shadowVolume,defined(r)?(scratchOptions.semiMajorAxis=i._semiMajorAxis,scratchOptions.semiMinorAxis=i._semiMinorAxis,r._ellipseGeometry=new EllipseGeometry(scratchOptions),r):(scratchOptions.radius=i._semiMajorAxis,new CircleGeometry(scratchOptions))},CircleGeometry.createGeometry=function(e){return EllipseGeometry.createGeometry(e._ellipseGeometry)},CircleGeometry.createShadowVolume=function(e,t,r){var i=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,s=t(i,o),a=r(i,o);return new CircleGeometry({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:i,extrudedHeight:s,height:a,vertexFormat:VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(CircleGeometry.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}});export default CircleGeometry;
import when from"../ThirdParty/when.js";import Check from"./Check.js";import Credit from"./Credit.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import Ellipsoid from"./Ellipsoid.js";import Event from"./Event.js";import GeographicTilingScheme from"./GeographicTilingScheme.js";import HeightmapTerrainData from"./HeightmapTerrainData.js";import TerrainProvider from"./TerrainProvider.js";function CustomHeightmapTerrainProvider(e){e=defaultValue(e,defaultValue.EMPTY_OBJECT),Check.defined("options.callback",e.callback),Check.defined("options.width",e.width),Check.defined("options.height",e.height),this._callback=e.callback,this._tilingScheme=e.tilingScheme,defined(this._tilingScheme)||(this._tilingScheme=new GeographicTilingScheme({ellipsoid:defaultValue(e.ellipsoid,Ellipsoid.WGS84)})),this._width=e.width,this._height=e.height;var i=Math.max(this._width,this._height);this._levelZeroMaximumGeometricError=TerrainProvider.getEstimatedLevelZeroGeometricErrorForAHeightmap(this._tilingScheme.ellipsoid,i,this._tilingScheme.getNumberOfXTilesAtLevel(0)),this._errorEvent=new Event;var t=e.credit;"string"==typeof t&&(t=new Credit(t)),this._credit=t,this._readyPromise=when.resolve(!0)}Object.defineProperties(CustomHeightmapTerrainProvider.prototype,{errorEvent:{get:function(){return this._errorEvent}},credit:{get:function(){return this._credit}},tilingScheme:{get:function(){return this._tilingScheme}},ready:{get:function(){return!0}},readyPromise:{get:function(){return this._readyPromise}},hasWaterMask:{get:function(){return!1}},hasVertexNormals:{get:function(){return!1}},width:{get:function(){return this._width}},height:{get:function(){return this._height}}}),CustomHeightmapTerrainProvider.prototype.requestTileGeometry=function(e,i,t,r){var o=this._callback(e,i,t);if(defined(o)){var n=this._width,h=this._height;return when(o).then((function(e){var i=e;return Array.isArray(i)&&(i=new Float64Array(i)),new HeightmapTerrainData({buffer:i,width:n,height:h})}))}},CustomHeightmapTerrainProvider.prototype.getLevelMaximumGeometricError=function(e){return this._levelZeroMaximumGeometricError/(1<<e)},CustomHeightmapTerrainProvider.prototype.getTileDataAvailable=function(e,i,t){},CustomHeightmapTerrainProvider.prototype.loadTileDataAvailability=function(e,i,t){};export default CustomHeightmapTerrainProvider;
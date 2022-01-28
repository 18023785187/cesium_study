import when from"../ThirdParty/when.js";import Credit from"./Credit.js";import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import Ellipsoid from"./Ellipsoid.js";import Event from"./Event.js";import GeographicTilingScheme from"./GeographicTilingScheme.js";import getImagePixels from"./getImagePixels.js";import HeightmapTerrainData from"./HeightmapTerrainData.js";import CesiumMath from"./Math.js";import Rectangle from"./Rectangle.js";import Resource from"./Resource.js";import TerrainProvider from"./TerrainProvider.js";import TileProviderError from"./TileProviderError.js";function DataRectangle(e,r){this.rectangle=e,this.maxLevel=r}function VRTheWorldTerrainProvider(e){if(e=defaultValue(e,defaultValue.EMPTY_OBJECT),!defined(e.url))throw new DeveloperError("options.url is required.");var r=Resource.createIfNeeded(e.url);this._resource=r,this._errorEvent=new Event,this._ready=!1,this._readyPromise=when.defer(),this._terrainDataStructure={heightScale:.001,heightOffset:-1e3,elementsPerHeight:3,stride:4,elementMultiplier:256,isBigEndian:!0,lowestEncodedHeight:0,highestEncodedHeight:16777215};var t=e.credit;"string"==typeof t&&(t=new Credit(t)),this._credit=t,this._tilingScheme=void 0,this._rectangles=[];var i,a=this,o=defaultValue(e.ellipsoid,Ellipsoid.WGS84);function n(e){var r=e.getElementsByTagName("SRS")[0].textContent;if("EPSG:4326"===r){a._tilingScheme=new GeographicTilingScheme({ellipsoid:o});var t=e.getElementsByTagName("TileFormat")[0];a._heightmapWidth=parseInt(t.getAttribute("width"),10),a._heightmapHeight=parseInt(t.getAttribute("height"),10),a._levelZeroMaximumGeometricError=TerrainProvider.getEstimatedLevelZeroGeometricErrorForAHeightmap(o,Math.min(a._heightmapWidth,a._heightmapHeight),a._tilingScheme.getNumberOfXTilesAtLevel(0));for(var i=e.getElementsByTagName("DataExtent"),n=0;n<i.length;++n){var s=i[n],h=CesiumMath.toRadians(parseFloat(s.getAttribute("minx"))),m=CesiumMath.toRadians(parseFloat(s.getAttribute("miny"))),u=CesiumMath.toRadians(parseFloat(s.getAttribute("maxx"))),d=CesiumMath.toRadians(parseFloat(s.getAttribute("maxy"))),c=parseInt(s.getAttribute("maxlevel"),10);a._rectangles.push(new DataRectangle(new Rectangle(h,m,u,d),c))}a._ready=!0,a._readyPromise.resolve(!0)}else l("SRS "+r+" is not supported.")}function l(e){var r=defaultValue(e,"An error occurred while accessing "+a._resource.url+".");i=TileProviderError.handleError(i,a,a._errorEvent,r,void 0,void 0,void 0,s)}function s(){when(a._resource.fetchXML(),n,l)}s()}Object.defineProperties(VRTheWorldTerrainProvider.prototype,{errorEvent:{get:function(){return this._errorEvent}},credit:{get:function(){return this._credit}},tilingScheme:{get:function(){if(!this.ready)throw new DeveloperError("requestTileGeometry must not be called before ready returns true.");return this._tilingScheme}},ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise.promise}},hasWaterMask:{get:function(){return!1}},hasVertexNormals:{get:function(){return!1}},availability:{get:function(){}}}),VRTheWorldTerrainProvider.prototype.requestTileGeometry=function(e,r,t,i){if(!this.ready)throw new DeveloperError("requestTileGeometry must not be called before ready returns true.");var a=this._tilingScheme.getNumberOfYTilesAtLevel(t),o=this._resource.getDerivedResource({url:t+"/"+e+"/"+(a-r-1)+".tif",queryParameters:{cesium:!0},request:i}).fetchImage({preferImageBitmap:!0});if(defined(o)){var n=this;return when(o).then((function(i){return new HeightmapTerrainData({buffer:getImagePixels(i),width:n._heightmapWidth,height:n._heightmapHeight,childTileMask:getChildMask(n,e,r,t),structure:n._terrainDataStructure})}))}},VRTheWorldTerrainProvider.prototype.getLevelMaximumGeometricError=function(e){if(!this.ready)throw new DeveloperError("requestTileGeometry must not be called before ready returns true.");return this._levelZeroMaximumGeometricError/(1<<e)};var rectangleScratch=new Rectangle;function getChildMask(e,r,t,i){for(var a=e._tilingScheme,o=e._rectangles,n=a.tileXYToRectangle(r,t,i),l=0,s=0;s<o.length&&15!==l;++s){var h=o[s];if(!(h.maxLevel<=i)){var m=h.rectangle,u=Rectangle.intersection(m,n,rectangleScratch);defined(u)&&(isTileInRectangle(a,m,2*r,2*t,i+1)&&(l|=4),isTileInRectangle(a,m,2*r+1,2*t,i+1)&&(l|=8),isTileInRectangle(a,m,2*r,2*t+1,i+1)&&(l|=1),isTileInRectangle(a,m,2*r+1,2*t+1,i+1)&&(l|=2))}}return l}function isTileInRectangle(e,r,t,i,a){var o=e.tileXYToRectangle(t,i,a);return defined(Rectangle.intersection(o,r,rectangleScratch))}VRTheWorldTerrainProvider.prototype.getTileDataAvailable=function(e,r,t){},VRTheWorldTerrainProvider.prototype.loadTileDataAvailability=function(e,r,t){};export default VRTheWorldTerrainProvider;
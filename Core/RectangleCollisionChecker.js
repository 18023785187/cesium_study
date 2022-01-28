import RBush from"../ThirdParty/rbush.js";import Check from"./Check.js";function RectangleCollisionChecker(){this._tree=new RBush}function RectangleWithId(){this.minX=0,this.minY=0,this.maxX=0,this.maxY=0,this.id=""}function idCompare(e,t){return e.id===t.id}RectangleWithId.fromRectangleAndId=function(e,t,n){return n.minX=t.west,n.minY=t.south,n.maxX=t.east,n.maxY=t.north,n.id=e,n},RectangleCollisionChecker.prototype.insert=function(e,t){Check.typeOf.string("id",e),Check.typeOf.object("rectangle",t);var n=RectangleWithId.fromRectangleAndId(e,t,new RectangleWithId);this._tree.insert(n)};var removalScratch=new RectangleWithId;RectangleCollisionChecker.prototype.remove=function(e,t){Check.typeOf.string("id",e),Check.typeOf.object("rectangle",t);var n=RectangleWithId.fromRectangleAndId(e,t,removalScratch);this._tree.remove(n,idCompare)};var collisionScratch=new RectangleWithId;RectangleCollisionChecker.prototype.collides=function(e){Check.typeOf.object("rectangle",e);var t=RectangleWithId.fromRectangleAndId("",e,collisionScratch);return this._tree.collides(t)};export default RectangleCollisionChecker;
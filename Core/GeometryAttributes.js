import defaultValue from"./defaultValue.js";function GeometryAttributes(t){t=defaultValue(t,defaultValue.EMPTY_OBJECT),this.position=t.position,this.normal=t.normal,this.st=t.st,this.bitangent=t.bitangent,this.tangent=t.tangent,this.color=t.color}export default GeometryAttributes;
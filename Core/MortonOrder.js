import Check from"./Check.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";var MortonOrder={};function insertOneSpacing(e){return 1431655765&((e=858993459&((e=252645135&((e=16711935&(e^e<<8))^e<<4))^e<<2))^e<<1)}function insertTwoSpacing(e){return 153391689&((e=51130563&((e=50393103&((e=50331903&(e^e<<16))^e<<8))^e<<4))^e<<2)}function removeOneSpacing(e){return 65535&((e=16711935&((e=252645135&((e=858993459&((e&=1431655765)^e>>1))^e>>2))^e>>4))^e>>8)}function removeTwoSpacing(e){return 1023&((e=4278190335&((e=50393103&((e=51130563&((e&=153391689)^e>>2))^e>>4))^e>>8))^e>>16)}MortonOrder.encode2D=function(e,r){if(Check.typeOf.number("x",e),Check.typeOf.number("y",r),e<0||e>65535||r<0||r>65535)throw new DeveloperError("inputs must be 16-bit unsigned integers");return(insertOneSpacing(e)|insertOneSpacing(r)<<1)>>>0},MortonOrder.decode2D=function(e,r){if(Check.typeOf.number("mortonIndex",e),e<0||e>4294967295)throw new DeveloperError("input must be a 32-bit unsigned integer");return defined(r)||(r=new Array(2)),r[0]=removeOneSpacing(e),r[1]=removeOneSpacing(e>>1),r},MortonOrder.encode3D=function(e,r,n){if(Check.typeOf.number("x",e),Check.typeOf.number("y",r),Check.typeOf.number("z",n),e<0||e>1023||r<0||r>1023||n<0||n>1023)throw new DeveloperError("inputs must be 10-bit unsigned integers");return insertTwoSpacing(e)|insertTwoSpacing(r)<<1|insertTwoSpacing(n)<<2},MortonOrder.decode3D=function(e,r){if(Check.typeOf.number("mortonIndex",e),e<0||e>1073741823)throw new DeveloperError("input must be a 30-bit unsigned integer");return defined(r)||(r=new Array(3)),r[0]=removeTwoSpacing(e),r[1]=removeTwoSpacing(e>>1),r[2]=removeTwoSpacing(e>>2),r};export default MortonOrder;
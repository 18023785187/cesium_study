import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import oneTimeWarning from"./oneTimeWarning.js";function deprecationWarning(e,r){if(!defined(e)||!defined(r))throw new DeveloperError("identifier and message are required.");oneTimeWarning(e,r)}export default deprecationWarning;
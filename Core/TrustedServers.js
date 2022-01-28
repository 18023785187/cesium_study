import Uri from"../ThirdParty/Uri.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";var TrustedServers={},_servers={};function getAuthority(e){var r=new Uri(e);r.normalize();var t=r.authority();if(0!==t.length){if(r.authority(t),-1!==t.indexOf("@")){var i=t.split("@");t=i[1]}if(-1===t.indexOf(":")){var o=r.scheme();if(0===o.length&&(o=(o=window.location.protocol).substring(0,o.length-1)),"http"===o)t+=":80";else{if("https"!==o)return;t+=":443"}}return t}}TrustedServers.add=function(e,r){if(!defined(e))throw new DeveloperError("host is required.");if(!defined(r)||r<=0)throw new DeveloperError("port is required to be greater than 0.");var t=e.toLowerCase()+":"+r;defined(_servers[t])||(_servers[t]=!0)},TrustedServers.remove=function(e,r){if(!defined(e))throw new DeveloperError("host is required.");if(!defined(r)||r<=0)throw new DeveloperError("port is required to be greater than 0.");var t=e.toLowerCase()+":"+r;defined(_servers[t])&&delete _servers[t]},TrustedServers.contains=function(e){if(!defined(e))throw new DeveloperError("url is required.");var r=getAuthority(e);return!(!defined(r)||!defined(_servers[r]))},TrustedServers.clear=function(){_servers={}};export default TrustedServers;
import defaultValue from"./defaultValue.js";import defined from"./defined.js";import DeveloperError from"./DeveloperError.js";import CesiumMath from"./Math.js";var factorial=CesiumMath.factorial;function calculateCoefficientTerm(r,e,o,a,t,f){var i,n,l,u=0;if(a>0){for(n=0;n<t;n++){for(i=!1,l=0;l<f.length&&!i;l++)n===f[l]&&(i=!0);i||(f.push(n),u+=calculateCoefficientTerm(r,e,o,a-1,t,f),f.splice(f.length-1,1))}return u}for(u=1,n=0;n<t;n++){for(i=!1,l=0;l<f.length&&!i;l++)n===f[l]&&(i=!0);i||(u*=r-o[e[n]])}return u}var HermitePolynomialApproximation={type:"Hermite",getRequiredDataPoints:function(r,e){if(e=defaultValue(e,0),!defined(r))throw new DeveloperError("degree is required.");if(r<0)throw new DeveloperError("degree must be 0 or greater.");if(e<0)throw new DeveloperError("inputOrder must be 0 or greater.");return Math.max(Math.floor((r+1)/(e+1)),2)},interpolateOrderZero:function(r,e,o,a,t){var f,i,n,l,u;defined(t)||(t=new Array(a));var h=e.length,m=new Array(a);for(f=0;f<a;f++){t[f]=0;var v=new Array(h);for(m[f]=v,i=0;i<h;i++)v[i]=[]}var c=h,p=new Array(c);for(f=0;f<c;f++)p[f]=f;var d=h-1;for(l=0;l<a;l++){for(i=0;i<c;i++)u=p[i]*a+l,m[l][0].push(o[u]);for(f=1;f<c;f++){var s=!1;for(i=0;i<c-f;i++){var g,M=e[p[i]],w=e[p[i+f]];w-M<=0?(g=o[u=p[i]*a+a*f+l],m[l][f].push(g/factorial(f))):(g=m[l][f-1][i+1]-m[l][f-1][i],m[l][f].push(g/(w-M))),s=s||0!==g}s||(d=f-1)}}for(n=0;n<=0;n++)for(f=n;f<=d;f++){var y=calculateCoefficientTerm(r,p,e,n,f,[]);for(l=0;l<a;l++){var A=m[l][f][0];t[l+n*a]+=A*y}}return t}},arrayScratch=[];function fillCoefficientList(r,e,o,a,t,f){for(var i,n,l=-1,u=e.length,h=u*(u+1)/2,m=0;m<t;m++){var v=Math.floor(m*h);for(i=0;i<u;i++)n=e[i]*t*(f+1)+m,r[v+i]=a[n];for(var c=1;c<u;c++){var p=0,d=Math.floor(c*(1-c)/2)+u*c,s=!1;for(i=0;i<u-c;i++){var g,M,w=o[e[i]],y=o[e[i+c]];if(y-w<=0)M=(g=a[n=e[i]*t*(f+1)+t*c+m])/CesiumMath.factorial(c),r[v+d+p]=M,p++;else{var A=Math.floor((c-1)*(2-c)/2)+u*(c-1);M=(g=r[v+A+i+1]-r[v+A+i])/(y-w),r[v+d+p]=M,p++}s=s||0!==g}s&&(l=Math.max(l,c))}}return l}HermitePolynomialApproximation.interpolate=function(r,e,o,a,t,f,i){var n=a*(f+1);defined(i)||(i=new Array(n));for(var l=0;l<n;l++)i[l]=0;var u,h=e.length,m=new Array(h*(t+1));for(u=0;u<h;u++)for(var v=0;v<t+1;v++)m[u*(t+1)+v]=u;for(var c=m.length,p=arrayScratch,d=fillCoefficientList(p,m,e,o,a,t),s=[],g=c*(c+1)/2,M=Math.min(d,f),w=0;w<=M;w++)for(u=w;u<=d;u++){s.length=0;for(var y=calculateCoefficientTerm(r,m,e,w,u,s),A=Math.floor(u*(1-u)/2)+c*u,C=0;C<a;C++){var x=p[Math.floor(C*g)+A];i[C+w*a]+=x*y}}return i};export default HermitePolynomialApproximation;
const routes=[],routeNames=[];function add(o,e){const t={pattern:o,route:e};routes.push(t),routeNames.push(o)}add("/blog/?.*","blog"),add("/about","about"),add("/","home"),"undefined"==typeof window?module.exports=routeNames:(window.routes=routes,window.routeNames=routeNames);
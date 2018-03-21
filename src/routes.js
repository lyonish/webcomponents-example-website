const routes = [];
const routeNames = []

function add(regex, route){
  // const _regex = new RegExp(regex);
  const _route = {
    'pattern': regex,
    'route': route
  }
  routes.push(_route);
  routeNames.push(regex);
}

add('/blog/?.*', 'blog');
add('/about', 'about');
add('/', 'home');

if(typeof window === 'undefined'){
  // Todo: integrate to express
  // module.exports = routeNames;
}else{
  window.routes = routes;
  window.routeNames = routeNames
}
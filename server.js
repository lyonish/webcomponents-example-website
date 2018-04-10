const express = require('express')
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');
const index = fs.readFileSync(path.join(__dirname, 'dist/index.html'));

const options = {
  "root": "./dist/"
}

const port = 3013;
const routeNames = require('./src/routes.js');

//dot doesn't mean same.  client: blog/?.*, server: blog/?*
routeNames.forEach((regex, index) => {
 routeNames[index] = regex.replace(/\.\*/, '\*' );
});

app.get('/***.js', function (req, res) {
  res.sendFile(req.url, options);
});

app.get('/store/*.json', function (req, res) {
  res.sendFile(req.url, options);
});

app.get('/assets/**', function(req, res) {
  res.sendFile(req.url, options);
});

app.get(routeNames, function (req, res) {
  res.sendFile('./index.html', options);
});

app.get('*', function (req, res) {
  res.status(404).send(req.url + " doesn't exist.");
});


app.listen(port, () =>{
  console.log('listening port ' + port + ' ...')
});
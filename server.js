var express = require('express')
var app = express()

const options = {
  "root": "./dist/"
}

app.get('/', function (req, res) {
  res.sendFile('./index.html', options )
})

app.get('/components/*/*.js', function (req, res) {
  console.log(req.url);
  res.sendFile(req.url, options);
})

app.get('/store/*.json', function (req, res) {
  console.log(req.url);
  res.sendFile(req.url, options);
})


app.listen(3013, () =>{
  console.log('listening port 3013 ...')
})
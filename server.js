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

app.get('/***.js', function (req, res) {
  res.sendFile(req.url, options);
});

app.get('/store/*.json', function (req, res) {
  res.sendFile(req.url, options);
});

app.get('/(|about|blog)/?', function (req, res) {
  res.sendFile('./index.html', options);
});

app.get('*', function (req, res) {
  res.status(404).send(req.url + " doesn't exist.");
});



// router.get('/aaabbb', (req, res, next) => {
//   res.sendFile('./index.html', options);
// });
// app.use('/', router);

app.listen(port, () =>{
  console.log('listening port ' + port + ' ...')
});
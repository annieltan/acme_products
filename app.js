const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
app.use(bodyParser.json())
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views', {noCache: true});


app.listen(port, function(){
  console.log(`listening on port ${ port }`);
})

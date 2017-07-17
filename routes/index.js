const express = require('express');
const router = express.Router();
const productBank = require('../productBank');
const methodOverride = require('method-override')

router.use(methodOverride('_method'))
router.use(express.static('public'))
router.use( function( req, res, next ) {
    if ( req.query._method == 'DELETE' ) {
      console.log('found a delete')
        req.method = 'DELETE';
        req.url = req.path;
        console.log(req.method, req.url)
    }
    next();
});

router.get('/', function(req, res, next){
  let sorted = productBank.highestRank();
  let topPdt = sorted[0].product;
  let topId = sorted[0].id;
  //let topRate = sorted[0].rating;
  res.render('index', {pdt: topPdt, id: topId, home: true})
})

router.get('/products', function(req, res, next){
  let sorted = productBank.highestRank();
  res.render('index', {showForm: true,
                       allPdt: true,
                       pdts: sorted})
})

router.get('/products/:id', function(req, res){
  let id = req.params.id;
  let findPdt = productBank.find({id: Number(id)});
  console.log('found',findPdt)
  res.render('index', {pdt: findPdt[0].product,
                       rate: findPdt[0].rating,
                       id: id,
                       showPdt: true})
})

router.post('/products', function(req, res){
  var newPdt = req.body.name;
  var newRate = req.body.text;
  productBank.add(newPdt, newRate);
  res.redirect('/products')
})

router.delete('/products/:id', function(req, res){
  console.log(req.body, req.method, req.url)
  let id = req.url.split("/")[2];
  let findPdt = productBank.find({id: Number(id)});
  console.log('yo', id, findPdt)
  productBank.remove(findPdt[0])
  res.redirect('/products')
})

module.exports = router;

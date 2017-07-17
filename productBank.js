const _ = require('lodash');
var products = [{product: 'Tea Tree Cleanser',
rating: 10,
id: 1},
{product: 'Snail Sleeping Mask',
rating: 8,
id: 2},
{product: 'Green Tea Toner',
rating: 9,
id: 3},
{product: 'Pitera Essence',
rating: 10,
id: 4},
{product: 'Rose Petal Emulsion',
rating: 7,
id: 5},
{product: 'Honey Night Cream',
rating: 10,
id: 6}]

function add(name, rating){
  products.push({product: name, rating:rating, id: products.length+1});
}

function list(){
  return _.cloneDeep(products);
}

function find (properties) {
  console.log('fudge', properties)
  return _.cloneDeep(_.filter(products, properties));
}

function highestRank(){
  products.sort(function compare(a, b) {
  if (a.rating > b.rating) {
    return -1;
  }
  else if (a.rating < b.rating) {
    return 1;
  }
  // a must be equal to b
  return 0;});
  console.log('sorted', products)
  return products
}

function remove(found){
  console.log('arg found', found)
  for (var i=0; i<products.length; i++){
    console.log(found.id, products[i].id)
    if (found.id == products[i].id){
      index = i;
      products.splice(index, 1);
    }
  }
  console.log('removed product', products)
  return products
}

module.exports = {add: add, list: list,
                  highestRank: highestRank,
                  find: find,
                  remove: remove};

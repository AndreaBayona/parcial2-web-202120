var express = require('express');
var router = express.Router();

const {getProducts} = require('../controllers/product');

/* GET products listing. Please establish connection with getProduct function from controllers/product.js  */
router.get('/', function (req, res, next) {
  const param = req.query.q;
  console.log(param, "query")
  res.send(
      getProducts(param)
  );
});

module.exports = router;

const data = require('../assets/data');

function getProducts(query) {
  if (query) return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  else return data;
}

module.exports = { getProducts };

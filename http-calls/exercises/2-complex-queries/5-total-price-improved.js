/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * without applying any discount, but only count items that are currently in stock
 */

import './qs.js';
async function ex4() {
  const query = qs.stringify(
    {
      fields: ['price'],
      filters: { outOfStock: 'false' },
    },
    {
      encodeValuesOnly: true,
    },
  );
  console.log('The query string', query);

  // call the matching endpoint and include the querystring after the ?
  const baseUrl = 'http://localhost:1337/api/products';
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();
  const data = result.data;

  let price = 0;
  for (let i = 0; i < data.length; i++) {
    let prices = data[i].attributes.price;
    price += prices;
  }
  return console.log(price);
}
ex4();

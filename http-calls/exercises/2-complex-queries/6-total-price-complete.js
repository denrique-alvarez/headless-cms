/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * taking into consideration that it's impossible to buy items that are out of stuck,
 * and taking the discount rates into account
 */

import './qs.js';
async function ex6() {
  const query = qs.stringify(
    {
      fields: ['price'],
      filters: { outOfStock: 'false' },
      populate: ['discount'],
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
  console.log(data);

  let pricesArr = [];
  for (let i = 0; i < data.length; i++) {
    let price = data[i].attributes.price;
    let check = data[i].attributes.discount.data;

    if (check !== null) {
      let discount = price * (check.attributes.percentage / 100);
      let priceMinusDiscount = price - discount;
      pricesArr.push(priceMinusDiscount);
    } else {
      pricesArr.push(price);
    }
  }
  return console.log(
    pricesArr.reduce((previous, next) => {
      return previous + next;
    }),
  );
}
ex6();

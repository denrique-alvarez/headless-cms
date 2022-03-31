/**
 * Fill in the blanks to create a script
 * that prints the name of the most expensive item that someone can buy (after applying any discounts,
 * and not including any items that are out of stock)
 */

import './qs.js';
async function searchProductByName(nameStr) {
  const query = qs.stringify(
    {
      fields: ['name', 'price'],
      filters: {
        name: {
          $contains: nameStr,
        },
        outOfStock: 'false',
      },
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
  const mostExpensive = Math.max(...pricesArr);
  const index = pricesArr.indexOf(mostExpensive);
  const name = result.data[index].attributes.name;
  return name;
}

async function test() {
  console.log('Products containing name', await searchProductByName('name'));
  console.log('Products containing prog', await searchProductByName('prog'));
  console.log('Products containing pro', await searchProductByName('pro'));
}

test();

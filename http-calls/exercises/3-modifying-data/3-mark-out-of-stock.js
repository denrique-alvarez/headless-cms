/**
 * Complete the following function
 * that can be used to mark a product
 * as out of stock
 * @param {*} productId the id of the product that is out of stuck
 */
async function markOutOfStock(productId) {
  const path = `products/${productId}`;
  const body = {
    data: {
      outOfStock: true,
    },
  };
  const url = `http://localhost:1337/api/${path}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

markOutOfStock(7);

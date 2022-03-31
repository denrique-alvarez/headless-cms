/**
 * Take a look at: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#update-an-entry
 *
 * and complete the following function that allows
 * the user to update the name of a product with a certain id.
 */

async function updateProductName(productId, newName) {
  const path = `products/${productId}`;
  const body = {
    data: {
        name: newName,
      meta: {},
    },
    meta: {},
  };
  const url = `http://localhost:1337/api/${path}`;
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

updateProductName(1, 'Nerd stuff');

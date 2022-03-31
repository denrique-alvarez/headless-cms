/**
 * Complete the following function that removes the discount applied to a product
 */
async function removeDiscounts(productId) {
  const path = `products/${productId}`;
  const body = {
    data: {
      discount: null,
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

removeDiscounts(6);

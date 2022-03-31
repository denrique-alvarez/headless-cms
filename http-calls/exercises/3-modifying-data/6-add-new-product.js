/**
 * Complete the following function that creates a new product
 */
async function createNewProduct(
  name,
  description,
  price,
  discountId,
  categoryId,
  outOfStock,
) {
  const path = `products?populate=category&populate=discount`;
  const body = {
    data: {
      name: name,
      description: description,
      price: price,
      discount: {
        id: discountId,
      },
      outOfStock: outOfStock,
      category: {
        id: categoryId,
      },
    },
  };

  const url = `http://localhost:1337/api/${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

const description = 'Vestibulum leo urna, cursus vel libero at, tincidunt bibendum nibh. Sed mollis erat eget maximus faucibus. In vitae dolor vitae libero malesuada porta. Nulla facilisi.';

createNewProduct('Chair', description, 2500, 2, 2, false);
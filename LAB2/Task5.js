function updateProductInfo(product) {
    return {
      ...product,
      discount: 10,
      inStock: true
    };
  }
  const product = { id: 101, name: 'Laptop', price: 1000, category: 'Electronics' };
  const updatedProduct = updateProductInfo(product);
  console.log(updatedProduct);
  
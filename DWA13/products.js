import { products } from "./data";

console.log("Products script loaded");

// 1. Use forEach to console.log each product name to the console:
products.forEach((product) => {
  console.log(product.product);
});

// 2. Use filter to filter out products that have a name longer than 5 characters:
const filteredProducts = products.filter((product) => product.product.length <= 5);
console.log(filteredProducts);

// 3. Using both filter and map, convert all prices that are strings to numbers, and remove all products from the array that do not have prices. After this has been done, then use reduce to calculate the combined price of all remaining products:
const validProducts = products
  .filter((product) => product.price.trim() && !isNaN(Number(product.price)))
  .map((product) => Number(product.price));
const totalPrice = validProducts.reduce((acc, price) => acc + price, 0);
console.log(totalPrice);

// 4. Use reduce to concatenate all product names to create the following string: "banana, mango, potato, avocado, coffee and tea":
const concatenatedNames = products.reduce((acc, product, index) => {
  if (index === 0) {
    return product.product;
  }
  return `${acc}, ${product.product}`;
}, "");
console.log(concatenatedNames);

// 5. Use reduce to calculate both the highest and lowest-priced items:
const priceArray = products
  .filter((product) => product.price.trim() && !isNaN(Number(product.price)))
  .map((product) => ({ name: product.product, price: Number(product.price) }));
const highestPrice = priceArray.reduce((acc, product) =>
  product.price > acc.price ? product : acc
);
const lowestPrice = priceArray.reduce((acc, product) =>
  product.price < acc.price ? product : acc
);
console.log(`Highest: ${highestPrice.name}. Lowest: ${lowestPrice.name}.`);

// 6. Using only Object.entries and reduce, recreate the object with the exact same values, but with the following object keys changed in the new array:
const modifiedProducts = products.map((product) => {
  const modifiedProduct = {};
  Object.entries(product).forEach(([key, value]) => {
    if (key === "product") {
      modifiedProduct.name = value;
    } else if (key === "price") {
      modifiedProduct.cost = value;
    } else {
      modifiedProduct[key] = value;
    }
  });
  return modifiedProduct;
});
console.log(modifiedProducts);
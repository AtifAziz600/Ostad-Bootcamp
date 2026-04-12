const numbers = [1, 2, 3, 4, 5];

const total = numbers.reduce((acc, current) =>{
    return acc + current;
}, 20);

console.log(total);

const max = numbers.reduce((acc, current) => {
    return current > acc ? current : acc;
}, numbers[0]
);

console.log(max);

const cart = [
  { product: 'Shirt', price: 500 },
  { product: 'Pant', price: 900 },
  { product: 'Shoe', price: 1200 },
];

const totalPrice = cart.reduce((acc, item) => {
  return acc + item.price;
}, 0);

console.log(totalPrice);
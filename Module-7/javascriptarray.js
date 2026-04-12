let foods = ["Pizza", "Burger", "Pasta", "Sushi", "Tacos"];

console.log(foods[0]); // Output: Pizza
console.log(foods[2]); // Output: Pasta
console.log(foods.length); // Output: 5
foods.push("Salad");
foods.pop("Tacos");
foods.shift();
foods.unshift("Salad");
foods.splice(2, 1);
console.log(foods);
let foods = {
    "Pizza": 10,
    "Burger": 5,
    "Pasta": 8,
    "Sushi": 12,
    "Tacos": 6
}

for (let food in foods) {
    // property access
    console.log(food);
    // value access
    console.log(foods[food]);

    console.log(food + ": " + foods[food]);
}
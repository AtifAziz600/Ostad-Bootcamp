// 1)  Write a function named findSmallest(arr) that returns the smallest number from an array.

function findSmallest(array) {
    let smallest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < smallest) {
            smallest = array[i];
        }

    }
    return smallest;
}

const numbers = [4, 2, 8, 1, 9];
const smallestNumber = findSmallest(numbers);
console.log(smallestNumber); // Output: 1

// 2) Write a JavaScript function named mergeArrays(arr1, arr2) that takes two arrays as arguments and returns a new array

function mergeArrays(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result.push(a[i]);  
    }
    for (let i = 0; i < b.length; i++) {
        result.push(b[i]);  
    }
    return result; 
}

const array1 = [1, 2];
const array2 = [3, 4];
const mergedArray = mergeArrays(array1, array2);
console.log(mergedArray); // Output: [1, 2, 3, 4]
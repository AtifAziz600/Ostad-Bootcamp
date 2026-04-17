function findSmallest(arr){
    if (arr.length === 0) return null;
    let smallest = arr[0];
    for(let i = 1; i < arr.length; i++){
        if(arr[i] < smallest) {
            smallest = arr[i];
        }
    }
    return smallest;
}

console.log(findSmallest([4, 2, 8, 1, 9])); 

function mergeArrays(arr1, arr2) {
    let merged = [];

    for(let i = 0; i < arr1.length; i++) {
        merged.push(arr1[i]);
    }
    for (let p = 0; p < arr2.length; p++) {
        merged.push(arr2[p]);
    }
    return merged;
}

console.log(mergeArrays([1,2],[3,4]));
function getMaxSubSum(arr) {
    let maxSum = 0;
    let currentSum = 0;

    for (let number of arr) {
        currentSum += number;

        if (currentSum < 0) {
            currentSum = 0;
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }

    return maxSum;
}

let arr = [1, -2, 3, 4, -9, 6];

alert(getMaxSubSum(arr));
const doubleNum = (num, ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num)
        }, ms)
    })
}
doubleNum(3, 1000)
.then(result => {
    result * 2
    console.log(result * 2);
})
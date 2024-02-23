const multiAsnyc = (timeout) => {
    const randomNum = Math.ceil(Math.random() * 1000)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(randomNum)
        }, timeout);
    })
}

Promise.all([multiAsnyc(1000), multiAsnyc(500)])
.then(result => {
    console.log(result);
    return result
})

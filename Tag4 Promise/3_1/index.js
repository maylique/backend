const newPromise = (num) => {
    return new Promise((resolve, reject) => {
        let newNum = num * num
        resolve(newNum)
    })
}

const rounds = (num) => {
    newPromise(num)
    .then(result => {
        console.log(result);
        return newPromise(result)
    })
    .then(result => {
        console.log(result);
        return newPromise(result)
    })
    .then(result => {
        console.log('letzte', result);
        return newPromise(result)
    })
}

rounds(4)
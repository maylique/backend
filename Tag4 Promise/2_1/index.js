const randomZahl = (num) => {
    let randNum = Math.ceil(Math.random() * num)
    return randNum
}

const gen = (num) => {
    return new Promise((resolve, reject) => {
        let zahl = randomZahl(num)
        console.log(zahl);
        if (zahl >= 6) {
            resolve()
        } else {
            reject()
        }
    })
}

gen(10)
.then(() => {
    console.log(true);
})
.catch(() => {
    console.log(false);
})
export const firstOF = (data1, data2) => {
    console.log(data1[0]);
    console.log(data2[0]);
}

export const allButLast = (data1, data2) => {
    console.log(data1.slice(0, -1));
    console.log(data2.slice(0, -1));
}

export const last = (data1, data2) => {
    let new1 = [...data1]
    let new2 = [...data2]
    console.log(new1.pop());
    console.log(new2.pop());
}

export const allButFirst = (data1, data2) => {
    let buffer = [...data1]
    let buffer2 = [...data2]
    let neueirgendwas = buffer.shift()
    let neueirgendwas2 = buffer2.shift()
    console.log(buffer);
    console.log(buffer2);
}

export const double = (data) => {
    let uniqueArray = [...new Set(data)]
    console.log(uniqueArray);
}

export const sum = (data) => {
    let total = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(total);
}

export const numBetween = (min, max) => {
    let hans = Math.round(Math.random() * (max - min) + min);
    console.log(hans);
}

export const cap = (word) => {
    console.log(word.charAt(0).toUpperCase() + word.slice(1));
}

export const capAll = (word) => {
    console.log(word.toUpperCase());
}

export const check = (w1, w2) => {
    console.log(w1.indexOf(0) == w2.lastIndexOf(0) ? true : false);
}
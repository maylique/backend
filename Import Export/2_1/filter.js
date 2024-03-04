export const more = (data) => {
    let hans = data.filter((city) => {
        return (
            city.population > 100000
        )
    })
    console.log(hans);
}

export const less = (data) => {
    let hans = data.filter((city) => {
        return (
            city.population < 100000
        )
    })
    console.log(hans);
}
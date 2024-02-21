import fs from 'fs';

fs.readFile('data.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
        throw err
    }
    console.log(data);
    let neueData = JSON.parse(data)
    neueData.map(el => {
        fs.writeFile('./data.txt', el.id + '- ' + el.title + '\n' + el.description + '\n', {flag: 'a'},  (err) => {
            if (err) {
                console.log(err);
                return
            }
            console.log('data written');
        })
    });
});

import fs from 'fs'

fs.mkdir('./unter', (err) => {
    if (err) {
        console.log('couldent <-- xD create new folder');
    }
    ichWillParam('jo')
})

const ichWillParam = (param) => {
    fs.access(`./unter/${param}.txt`, (err) => {
        if (err) {
            console.log(`./unter/${param}.txt does not exist`);
            fs.writeFile(`./unter/${param}.txt`, 'hier werbung', (err) => {
                if (err) {
                    console.log(`${param} couldent <-- xD be created`);
                }
            })
        } else {
            console.log(`./unter/${param}.txt does already exist`);
            fs.writeFile(`./unter/${param}.txt`,'\n' + 'hier neue werbung', {flag: 'a'}, (err) => {
                if (err) {
                    console.log(`${param} couldent <-- xD be overwritten`);
                }
                console.log(`${param} has been overwritten`);
            })
        }
    })
}


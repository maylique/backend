import fs from 'fs'

fs.writeFile('./blog1.txt', 'yo ich bin web dev alda', (err) => {
    if (err) {
        throw err
    }
    console.log('datei erstellt aldaaa');
})
fs.writeFile('./blog2.txt', 'Ich gucke mit Lupe in Kameras xd', (err) => {
    if (err) {
        throw err
    }
    console.log('datei erstellt aldaaa');
})

fs.access('./assets', fs.constants.F_OK, (err) => {
    if (err) {
        console.error(err);
        console.log('not found');
    }
    fs.rmdir('./assets', (err) => {
        if(err) {
            console.log('konnte nicht gelöscht werden');
        }
        fs.mkdir('./assets', (err) => {
            console.log('ordner wird erstellt');
        })
    })
})

fs.access('./delete.txt', (err) => {
    if (err) {
        console.log('delete.txt not found');
        fs.writeFile('./delete.txt', 'yo ich bin web dev alda', (err) => {
            if (err) {
                throw err
            }
            console.log('datei erstellt aldaaa');
        })
    } else {fs.unlink('./delete.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('delete gelöscht');
    })}
})

fs.rename('./Hello.txt', 'HelloWorld.txt', (err) => {
    if (err) {
        console.log('konnte nicht umbenannt werden');
    }
    console.log('hat geklappt bro');
})
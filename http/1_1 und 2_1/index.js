import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        sendFile('./home.html', res)
    }
    else if (req.url === '/about') {
        sendFile('./about.html', res)
    }
    else if (req.url === '/faq') {
        sendFile('./faq.html', res)
    }
    else if (req.url === '/contact') {
        sendFile('./contact.html', res)
    }
    else {
        sendFile(`./${req.url}`, res)
    }
})


const sendFile = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.end('Error 404 - Page not found')
        } else {
            res.end(data)
        }
    })
}

server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
})
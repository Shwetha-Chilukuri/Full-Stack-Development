const http = require('http')
const path = require('path')
const fs = require('fs')
const server = http.createServer((req, res) => {
    if (req.url === '/index.html' && req.method === 'GET') {
        const fp = path.join(__dirname, 'index.html');
        fs.readFile(fp, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading failed');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log(`Server running at 3000`);
});

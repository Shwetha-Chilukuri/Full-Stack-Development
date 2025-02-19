import http from 'http'
import url from 'url'
const server = http.createServer((req, res) => {
    const parurl = url.parse(req.url, true);
    if (parurl.pathname === '/greet') {
        const name = parurl.query.name;
        if (name) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h3>Hello, ${name}!</h3>`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Name query parameter is required');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const http = require('http');
const url = require('url');
const moment = require('moment');
const members = require('./members');
const users = require('./users')


const server = http.createServer((req, res) => {
    
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is the homepage');
        res.end();
    }
    else if (reqUrl.pathname == '/about') {
        res.statusCode = 200;
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify({
            Status: 'success',
            Message: 'response success',
            Description: 'Exercise 02',
            Date: moment().format(),
            Data: members
        }));
        res.end();
    }
    else if (reqUrl.pathname == '/users') {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(users));
        res.end();
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
    }
});

const port = 3000;
const hostname = '127.0.0.1';

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
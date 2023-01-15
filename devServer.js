const Bundler = require('parcel-bundler');
const express = require('express');
const http = require('http');
const open = require('open');
var path = require('path');

const app = express();

// Because of using express neccessary to host all static file like images etc. in separated public folder. 
var dir = path.join(__dirname, 'public');

app.use(express.static(dir));

const bundlePath = process.argv[2];
const port = process.argv[3];

// Enable in browser SharedBufferArray
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next()
})

const bundler = new Bundler(bundlePath);

app.use(bundler.middleware());

const server = http.createServer(app);
server.listen(port);

server.on('error', (err) => console.error(err));
server.on('listening', () => {
    console.info('Server is running');
    console.info(`  NODE_ENV=[${process.env.NODE_ENV}]`);
    console.info(`  Port=[${port}]`);
    open(`http://localhost:${port}`);
});
const { createServer: createHttpsServer } = require('https');
const { createServer: createHttpServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if (dev) {
  const httpsOptions = {
    key: fs.readFileSync('./localcerts/localhost.key'),
    cert: fs.readFileSync('./localcerts/localhost.crt'),
  };

  app.prepare().then(() => {
    createHttpsServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);

    }).listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on https://localhost:3000');
    });
  });
} else {
  app.prepare().then(() => createHttpServer((req, res) => {
    const { headers, url } = req;
    if (!headers['x-forwarded-proto'] || headers['x-forwarded-proto'] !== 'https' || headers.host.indexOf('www.') === 0) {
      res.writeHead(301, { Location: `https://airtime.wtf/${url}` });
      res.end();
      return {};
    }

    const parsedUrl = parse(url, true);
    return handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on localhost:3000');
  }));
}

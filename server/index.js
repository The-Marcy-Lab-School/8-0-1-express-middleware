/////////////////////
// Imports
/////////////////////

const gifs = require('./gifs.json');
const express = require('express');

/////////////////////
// Constants
/////////////////////

const app = express();

/////////////////////
// Middleware
/////////////////////


/////////////////////
// Controllers
/////////////////////

const serveData = (req, res, next) => res.send(gifs);

const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send(`hello ${name}`);
}

app.get('/api/hello', serveHello);
app.get('/api/data', serveData);

/////////////////////
// Listen
/////////////////////

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
const gifs = require('./gifs.json');
const express = require('express');

// 1. Import Path

// 2. Define a path to the dist folder

const app = express();

/////////////////////
// Controllers
/////////////////////

// 3. Create the logRoutes middleware


// 4. Create the serveStatic middleware


// "Response" controllers send data to the client
const serveData = (req, res, next) => res.send(gifs);
const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send(`hello ${name}`);
}

////////////////////////
// Routes
////////////////////////

// 5. Use both middleware


app.get('/api/hello', serveHello);
app.get('/api/data', serveData);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
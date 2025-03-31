/////////////////////
// Imports
/////////////////////

const gifs = require('./gifs.json');
const express = require('express');

// The path module is useful for constructing relative filepaths
const path = require('path');

/////////////////////
// Constants
/////////////////////

const app = express();

// the filepath is to the entire assets folder  
const filepath = path.join(__dirname, '../vite-project/dist');

/////////////////////
// Middleware
/////////////////////

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);
// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

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
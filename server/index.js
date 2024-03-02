const data = require('./db/data.js');
const express = require('express');
const path = require('path'); // used to make absolute path to static folder

// __dirname is the directory of this file
const pathToDistFolder = path.join(__dirname, '..', 'frontend', 'dist');

const app = express();

/////////////////////
// Controllers
/////////////////////

// "Middleware" Controllers perform server-side logic and then invoke next()

// Prints out information about the request for ALL requests
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// This middleware controller is created by invoking `express.static(filepath)`
// Sends the static assets (HTML, CSS, and JS) in the frontend dist folder to the client for ALL requests
const serveStatic = express.static(pathToDistFolder);

// "Response" controllers send data to the client
const serveData = (req, res, next) => res.send(data);
const serveHello = (req, res, next) => res.send('hello');

////////////////////////
// Routes
////////////////////////

// Middleware uses `app.use` and applies to ALL requests (unless otherwise specified)
app.use(logRoutes);
app.use(serveStatic);

app.get('/api/hello', serveHello);
app.get('/api/data', serveData);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
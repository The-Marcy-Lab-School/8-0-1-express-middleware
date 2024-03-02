# Express As A Static Website Server

In the last lecture, we created a server that could send back HTML in a single file. But when we build our React projects, they are more than just a single file. React projects typically have HTML, CSS, and JS, and potentially images or other files.

Time to bring in Express Middleware.

**Table of Contents:**
- [Terms](#terms)
- [Middleware Controllers](#middleware-controllers)
- [Serving Static Assets](#serving-static-assets)
- [Challenge](#challenge)

## Terms

* **Middleware** - an express controller that parses the request, performs a server-side action, and then passes the request to the next controller
* **Static Assets** - unchanging files delivered to the client exactly as they are stored on a server. These include HTML, CSS, JavaScript files, images, videos, fonts, and documents.


## Middleware Controllers

In express, technically every controller is a piece of "middleware".

A "middleware" controller is a function that parses requests, performs a server-side action, and then **passes the request to the next controller** without sending a response to the client.

For example, this middleware prints out information about the incoming request:

```js
// Prints out information about the request for ALL requests
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// app.use is like app.get but for middleware
// when invoked with just the middleware function, it invokes
// the middleware for ALL routes
app.use(logRoutes);
```

Notice it doesn't use the `res` object at all and then invokes `next()` to pass control to the next controller in the chain.

**Q: What would happen if the `logRoutes` controller DID send a response to the client? What would happen if it didn't invoke `next()`?>**

![](./images/express-middleware.svg)


## Serving Static Assets

One of the most important functions of a server is to provide a client with a frontend. That's what static website servers like GitHub Pages do — they store **static assets** (HTML, CSS, and JS files) and then provide a URL where users can access them.

With Express, it is really easy to build your own static website server using the `express.static(filepath)` middleware controller:

```js
const path = require('path');
const pathToDistFolder = path.join(__dirname, '..', 'path', 'to', 'frontend', 'dist')

const serveStatic = express.static(pathToDistFolder);

app.use(serveStatic);
```

* `express.static(filepath)` returns a middleware controller that can send the client static assets (HTML, CSS, and JS files) from the provided `filepath`. The `filepath` should be an absolute filepath.
* The built-in Node module `path` is often used to create absolute filepaths.
* `__dirname` returns the parent directory of the current file.

Now, if you run the server and visit the `host:port`, the server will send you the assets in the provided filepath.

## Challenge

**Setup:**
* Create a new GitHub repo on your account called `react-express-static-server` and clone it down.
* In the root of your repo, run the command `npm create vite@latest` and create a React application.
  * Keep the provided counter application. (You can change it up later though).
  * Run `npm run build` to generate the `dist` folder. This is going to be the folder containing the static assets (HTML, CSS, and JS files) that your server will serve.
* `cd ..` back to the root of your repo. Create a new folder called `server` and `cd` into it.
  * Run `npm i express`
  * Run `npm i -g nodemon` (if you haven't already installed `nodemon` globally).
  * Create an `index.js` file.
  * Run `nodemon index.js` to run your file. Each change you make will cause the file to re-run.

**Task:**
In `server/index.js`, write a server application using Express with the `logRoutes` middleware and the `serveStatic` middleware

Feel free to add any additional `app.get` endpoints that your server can handle.

When you've built your server, visit http://localhost:8080 (or whatever `port` number you chose) and test out your server!

When you're content with how it works, push your code to github and [follow these steps to deploy a no-database server application using Render](https://github.com/The-Marcy-Lab-School/render-deployment-instructions).

**Bonus Challenge**: Find your first React assignment (the Language Greeter App). Run `npm run build` to generate the `dist` folder. Build a server application to serve that `dist` folder and deploy the server application on Render.
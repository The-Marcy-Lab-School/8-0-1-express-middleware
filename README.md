# Express as a Static Web Server

In the last lecture, we created a server that could send back HTML in a single file. But when we build our React projects, they are more than just a single file. React projects typically have HTML, CSS, and JS, and potentially images or other files. In order to serve all of these static assets, we need Express Middleware.

Let's make a static web server!

**Table of Contents:**
- [Terms](#terms)
- [Setup](#setup)
- [Controllers Review](#controllers-review)
- [Middleware Controllers](#middleware-controllers)
- [Serving Static Assets](#serving-static-assets)
- [Challenge](#challenge)

## Terms

* **Middleware** - an express controller that parses the request, performs a server-side action, and then passes the request to the next controller
* **`path` module** - a module for creating absolute paths to static assets
* **Static Assets** - unchanging files delivered to the client exactly as they are stored on a server. These include HTML, CSS, JavaScript files, images, videos, fonts, and documents.

## Setup

* Create a new GitHub repo on your account called `react-express-static-server` with a `gitignore` template set to `Node` and a   `README.md` file for notes. Clone it down. 
* In the root of your repo, run the command `npm create vite@latest` and create a React application.
  * Keep the provided counter application. (You can change it up later though).
  * Run `npm run build` to generate the `dist` folder. This is going to be the folder containing the static assets (HTML, CSS, and JS files) that your server will serve.
* `cd ..` back to the root of your repo. Create a new folder called `server` and `cd` into it.
  * Run `npm i express`
  * Run `npm i -g nodemon` (if you haven't already installed `nodemon` globally).
  * Create an `index.js` file.
  * Run `nodemon index.js` to run your file. Each change you make will cause the file to re-run. <kbd>Ctrl + C</kbd> to turn off the server.

## Controllers Review

Remember how the Express app works?

1. A client sends a **request** to the server
1. The server receives the request and **routes** it to the proper **controller** based on the specific **endpoint**.
1. The controller parses the request and sends a **response**
1. The client receives the response and renders the data
  
![](./images/express-diagram-simple.svg)

```js
// controller
const serveHello = (req, res, next) => {
  res.send('hello');
}

// endpoint
app.get('/api/hello', serveHello);
```
* A **controller** is a callback function that parses a request and sends a response. It will be invoked by the `app` when the associated path is hit.
* This simple controller only uses the `res` value. But what about `req` and `next`?

## Middleware Controllers

A "middleware" controller is just a type of controller — they parse requests and perform server-side actions. 

Unlike regular controllers, middleware controllers **pass the request to the next controller without sending a response to the client.** They sit in the "middle" of the chain of controllers.

For example, this middleware prints out information about the incoming request in a nice format:

```js
// "middleware" controller
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// "response" controller
const serveHello = (req, res, next) => {
  res.send('hello');
}

// invoke `logRoutes` for ALL endpoints
app.use(logRoutes);

// invoke `serveHello` for /api/hello
app.get('/api/hello', serveHello);

```

* `app.use` is like `app.get` but for middleware
* When `app.use` is invoked with just the middleware function, it executes that middleware for ALL routes
* Notice that the `logRoutes` middleware controller doesn't use the `res` object at all and then invokes `next()` to pass control to the next controller in the chain.

Our diagram now looks like this:

![](./images/express-middleware.svg)


**<details><summary style="color: purple">Q: So, if a user sends a request to `http://localhost:8080/api/hello`, which controllers are invoked and in what order?</summary>**
> First the `logRoutes` middleware is invoked. The `next()` function is called which passes the request to the next controller, `serveHello`.
</details><br>

**<details><summary style="color: purple">Q: What would happen if the `logRoutes` controller DID send a response to the client? What would happen if it didn't invoke `next()`?</summary>**
> If `logRoutes` did invoke `res.send()`, the `serveHello` controller would NOT be invoked as a response has already been sent. 
> 
> If we simply didn't invoke `next()`, our server would "hang" — the response would never be completed and the client would likely receive a timeout error because the request took too long.
</details><br>


## Serving Static Assets

One of the most important functions of a server is to provide a client with a frontend. Whenever you visit a website, that's what happens — go to https://google.com and the Google server sends back HTML, CSS, and JavaScript.

That's what static web servers like GitHub Pages do — they store **static assets** (HTML, CSS, and JS files) and then provide a URL where users can access them.

With Express, it is really easy to build your own static web server using the `express.static(filepath)` middleware controller:

```js
// Construct the path to the static assets folder
const path = require('path');
const pathToDistFolder = path.join(__dirname, '..', 'path', 'to', 'frontend', 'dist')

// Create the middleware controller for serving static assets
const serveStatic = express.static(pathToDistFolder);

// Use the middleware controller
app.use(serveStatic);
```

* `express.static(filepath)` returns a middleware controller that can send the client static assets (HTML, CSS, and JS files) from the provided `filepath`. 
* The `filepath` should be an absolute filepath.
* The built-in Node module `path` is often used to create absolute filepaths.
* `__dirname` returns the parent directory of the current file.

Now, if you run the server and visit the `host:port`, the server will send you the assets in the provided filepath.

## Challenge

**Task:**
In `server/index.js`, write a server application using Express with the `logRoutes` middleware and the `serveStatic` middleware

Feel free to add any additional `app.get` endpoints that your server can handle.

When you've built your server, visit http://localhost:8080 (or whatever `port` number you chose) and test out your server!

When you're content with how it works, push your code to github and [follow these steps to deploy a no-database server application using Render](https://github.com/The-Marcy-Lab-School/render-deployment-instructions).

**Bonus Challenge**: Find your first React assignment (the Language Greeter App). Run `npm run build` to generate the `dist` folder. Build a server application to serve that `dist` folder and deploy the server application on Render.
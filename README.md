# Express as a Static Web Server

In the last lecture, we created a server that could send back HTML in a single file. But when we build our React projects, they are more than just a single file. React projects typically have HTML, CSS, and JS, and potentially images or other files. In order to serve all of these static assets, we need Express Middleware.

Let's make a static web server!

**Table of Contents:**
- [Terms](#terms)
- [Controllers Review](#controllers-review)
- [Middleware Controllers](#middleware-controllers)
- [Serving Static Assets](#serving-static-assets)

## Terms

* **Middleware** - an express controller that parses the request, performs a server-side action, and then passes the request to the next controller
* **`path` module** - a module for creating absolute paths to static assets
* **`__dirname`** — an environment variable that returns the absolute path of the directory containing the currently executing file.
* **Static Assets** - unchanging files delivered to the client exactly as they are stored on a server. These include HTML, CSS, JavaScript files, images, videos, fonts, and documents.

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
  const name = req.query.name || "stranger"
  res.send(`hello ${name}`);
}

// endpoint
app.get('/api/hello', serveHello);

// A GET request to /api/hello?name=ben will send the response "hello ben"
```
* A **controller** is a callback function that parses a request and sends a response. It will be invoked by the `app` when the associated path is hit.
* It receives a `req` object which can be used to get data about the request including **query parameters**
* It receives a `res` object which can be used to send a response.

What about `next`?

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
  const name = req.query.name || "stranger"
  res.send(`hello ${name}`);
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

Middleware can be custom-made like this `logRoutes` middleware controller. However, we can also utilize some of the out-of-the-box middleware controllers provided by Express.

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
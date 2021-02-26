"use strict";
// require the Express module, body-parser, and cors
const express = require("express");

// require our routes.js file
const routes = require("./routes");
// creates an instance of an Express server
const app = express();

// Enable Cross Origin Resource Sharing so this API
// can be used from web-apps other domains.

// allow POST and PUT requests to use JSON bodies

// use the routes file
app.use("/", routes);

// define the port
const port = 3000;
// run the server
app.listen(port, () => {
  console.log(`Listening on port: ${port}.`);
});

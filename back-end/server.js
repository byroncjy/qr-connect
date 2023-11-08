#!/usr/bin/env node

const app = require("./app"); // Load up the Express application

const port = process.env.PORT || 3000; // The port to listen to for incoming requests

// Call Express's listen function to start listening to the port
const listener = app.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

// A function to stop listening to the port
const close = () => {
  listener.close();
};

module.exports = {
  close: close,
};

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const container = require("./container");

container.resolve(function(users) {
  //create instance of express and start the server
  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000, function() {
      console.log("Listening on port 3000");
    });
    ConfigureExpress(app);

    //setup router
    const router = require("express-promise-router")();
    users.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app) {
    //to use all assets from the public folder
    app.use(express.static("public"));
    //ejs view engine
    app.set("view enginer", "ejs");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }
});

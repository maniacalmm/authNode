// entry point file
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      http = require("http"),
      morgan = require("morgan"),
      router = require('./router'),
      mongoose = require('mongoose');

// DB setup
const db_url = "mongodb://tang:geekbeta@ds229648.mlab.com:29648/auth_db"
mongoose.connect(db_url, (err) => {
    if (!err) console.log("db connected");
});

// App Setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: '*/*' }));
router(app);


// Server Setup
const port = process.env.port || 3090;
// const server = http.createServer(app);
// server.listen(port, err => {
//     if (!err) console.log("listening on ", port);
// })
app.listen(port, (err) => {
    if (!err) 
        console.log("listening at ", port);
});
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();

//SETUP:
app = express();
const PORT = process.env.PORT || 4000;

var whitelist = [
  // "http://localhost:3000",
  // "http://192.168.0.31:3000",
  "https://juanpamusic.com",
  "https://www.juanpamusic.com",
];
var corsOptions = {
  origin: function (origin, callback) {
    try {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
        // callback(new Error('Not allowed by CORS'))
      }
    } catch (e) {
    }
  },
};
// app.use(cors());
app.use(cors(corsOptions));

const limiter1 = rateLimit({
  windowMs: 3 * 1000, // 3 seconds
  max: 2, // limit each IP to 1 requests per windowMs
});
const limiter2 = rateLimit({
  windowMs: 15000, // 15 seconds
  max: 1, // limit each IP to 1 requests per windowMs
});
const limiter3 = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 1 requests per windowMs
});

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes:
app.get("/", (req, res) => {
  return res.json("Welcome to JuanpaMusic!");
});

const admindata = require("./apis/admindata");
app.use("/admindata", limiter1, admindata);

const contact = require("./apis/contact");
app.use("/contact", limiter2, limiter3, contact);

const iglinksdata = require("./apis/iglinksdata");
app.use("/iglinksdata", limiter1, iglinksdata);

// Error handler route:
  app.use((err, req, res, next) => {
    const status = err.status || 500;
  
  const DATA = `-------------------
  'we recieved an error @ ${new Date().toUTCString()} ${status}
  here is your error:
  ${err}
  -------------------
  `
    fs.appendFile('error.txt', DATA, function (err) {
      if (err) throw err;
    });
    err.statusText = err.statusText + ' ' + err.message
    res.status(status).send(err.message);
  });

app.listen(PORT, () => {
});


module.exports = app;
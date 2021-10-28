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
      // console.log(origin)
      if (whitelist.indexOf(origin) !== -1) {
        console.log('request for: ', origin)
        console.log("CORS allowed!");
        callback(null, true);
      } else {
        console.log("CORS NOT allowed!");
        callback(null, false);
        // callback(new Error('Not allowed by CORS'))
      }
    } catch (e) {
      console.log("CORS NOT ALLOWED!");
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

const admindata = require("./admindata");
app.use("/admindata", limiter1, admindata);

const contact = require("./contact");
app.use("/contact", limiter2, limiter3, contact);

// Error handler route:
  app.use((err, req, res, next) => {
    const status = err.status || 500;
  
  const DATA = `-------------------
  'we recieved an error @ ${new Date().toUTCString()} ${status}
  here is your error:
  ${err}
  -------------------
  `
  console.log(DATA)
    fs.appendFile('error.txt', DATA, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    err.statusText = err.statusText + ' ' + err.message
  console.log('EROOR: ', err.status, err.statusText);
    res.status(status).send(err.message);
  });

app.listen(PORT, () => {
  console.log("App started... on 4000");
});


module.exports = app;
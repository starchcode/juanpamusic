const fs = require("fs");

const logger = (DATA) => {
  let date = new Date();
  const YEAR = date.getFullYear();
  const MONTH =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const DAY = date.getDate();
  const HOUR = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const MINUTE =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const SECONDS =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const DATE = "" + YEAR + MONTH + DAY + " - " + HOUR + MINUTE + SECONDS; //append date and convert to string

  fs.appendFile(`log/log${DATE}.txt`, DATA, function (err) {
    if (err) throw err;
  });
};

module.exports = logger;

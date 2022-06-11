const { google } = require("googleapis");
const sheets = google.sheets("v4");
const iglinksdata = require("express").Router();
const logger = require("../utils/logger");

//SETUP
const auth = new google.auth.GoogleAuth({
  //google auth!
  keyFile: "./key.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], //read & write
});
// set auth as a global default
google.options({
  auth: auth,
});


//ROUTER:

iglinksdata.get("/", async (req, res, next) => {
    const SP_ID = "173A6E2LtQgSKSRPzSB_jappnMiLzlicK8ZVaCNrkNAc";
    const SHEET = "iglinks!";
    const GET_RANGE = "A2:D";
    const iglinks = [];
    try {
      await sheets.spreadsheets.values.get(
        {
          auth: auth, //HERE
          spreadsheetId: SP_ID,
          range: SHEET + GET_RANGE,
        },
        (err, gres) => {
          if (err) {
            logger(
              "API returned an error: \n" +
              err.response.data.error.code +
                "\n" +
                err.response.data.error.message
            );
            const error = new Error( "Google API Error \n" + err.response.data.error.message);
            error.status = err.response.data.error.code;
            next(error);
          }
  
          if (gres.status === 200) {
            // logger(`☑️  Data recieved, this is your data:` + gres.data.values);
            gres.data.values.forEach((element, i, arr) => {
                if (element.every(Boolean) && element.length == 4)
                iglinks.push(element)
            })
            return res.json( iglinks );
          }
        }
      );
    } catch (e) {
      logger(e.response || e);
      return res.status(500).json({
        error: e.response || e,
      });
    }
  });
  


module.exports = iglinksdata;

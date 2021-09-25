const { google } = require("googleapis");
const sheets = google.sheets("v4");
const fs = require("fs");
const admindata = require("express").Router();

//FS:
let date = new Date();
const YEAR = date.getFullYear()
const MONTH =  date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
const DAY =  date.getDate()
const HOUR = date.getHours() < 10 ? '0' + date.getHours(): date.getHours();
const MINUTE = date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes();
const SECONDS = date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds();
const DATE = ''+YEAR+MONTH+DAY + ' - ' + HOUR+MINUTE+SECONDS; //append date and convert to string

const logger = (DATE, DATA) => {
  fs.appendFile(`log/log${DATE}.txt`, DATA, function (err) {
    if (err) throw err;
    console.log(DATA);
  });
};

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

// logger(DATE, 'passed');
//ROUTER:
admindata.get("/", async (req, res) => {

//sheet
// const SP_ID='173A6E2LtQgSKSRPzSB_jappnMiLzlicK8ZVaCNrkNA'
const SP_ID='173A6E2LtQgSKSRPzSB_jappnMiLzlicK8ZVaCNrkNAc'
const SHEET= 'data!'
//Range    
const GET_RANGE = 'A:O';

    try {
        await sheets.spreadsheets.values.get(
          {
            auth: auth, //HERE
            spreadsheetId: SP_ID,
            range: SHEET + GET_RANGE,
          },
          (err, gres) => {
            if (err) {
              logger(DATE, err.response.data.error.code + '\n');
              logger(DATE, err.response.data.error.message);
              
                console.log('API returned an error')
              throw err;
            }
            /*
             I might not need this:
            data = res.data.values.filter((row) => {
              // 1 index: email status
              // 3 index: name
              // 5 index: email address
              return !row[1] && row[3] && row[5] && row[6];
            });
            */
           
            if (gres.status === 200) {
                logger(DATE,`☑️  Data recieved, this is your data:`)
                logger(DATE, gres.data.values[0][0])
            return res.json({
                data: gres.data.values,
              });
            }
            logger(DATE,`Response status: ${gres.status} `)

            // if (gres.data.length) {
            //   logger(DATE,`
            //   Going to send emails.
            //   `);
            // }
          }
        );
      } catch (e) {
          logger(DATE, e.response);
        console.log('CATCH');
        console.log(e.response);
        return res.json({
          error: e.response,
        });
      }


});

module.exports = admindata;


//https://drive.google.com/uc?id=
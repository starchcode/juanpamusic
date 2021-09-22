const { google } = require("googleapis");
const sheets = google.sheets("v4");

const admindata = require("express").Router();


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
admindata.get("/", async (req, res) => {

//sheet
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
            //   logger(DATE, "The API returned an error.");
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
            //     logger(DATE,`☑️  Data recieved, there are ${this.data.length} emails to be sent
            //   `)
            return res.json({
                data: gres.data.values,
              });
            }
  
            if (gres.data.length) {
            //   logger(DATE,`
            //   Going to send emails.
            //   `);
            }
          }
        );
      } catch (e) {
        //   logger(e.response);
        console.log('CATCH');
        console.log(e.response);
      }


});

module.exports = admindata;


//https://drive.google.com/uc?id=
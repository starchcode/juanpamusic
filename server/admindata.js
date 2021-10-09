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
    // console.log(DATA);
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

//ROUTER:
admindata.get("/", async (req, res) => {

//sheet
// const SP_ID='173A6E2LtQgSKSRPzSB_jappnMiLzlicK8ZVaCNrkNA'
const SP_ID='173A6E2LtQgSKSRPzSB_jappnMiLzlicK8ZVaCNrkNAc'
const SHEET= 'data!'
//Range    
const GET_RANGE = 'A3:V';
let home = [];
let music = [];
let shows = [];

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
              //todo uncomment next 2 lines
                // logger(DATE,`☑️  Data recieved, this is your data:`)
                // logger(DATE, gres.data.values[0][0])
                // console.log(gres);
              console.log(gres.data.values);
              gres.data.values.forEach((element, i, arr) => {
                let homeArr = i === 0 ? element.slice(0, 6) : [null];
                let musicArr = element.slice(7, 14);
                let showsArr = element.slice(15, 22);

                if(homeArr.every(Boolean) && homeArr.length == 6){
                  home.push(...homeArr);
                  home[0] = home[0].match(/(https:\/\/youtu.be\/)(.+)/)[2]
                  home[1] = home[1].match(/(https:\/\/open.spotify.com\/playlist\/)(.+)[?](.*)/)[2]
                }
                if(musicArr.every(Boolean) && musicArr.length == 7){
                  music.push(musicArr)
                }
                if(showsArr.every(Boolean) && showsArr.length == 7){
                  shows.push(showsArr)
                }
               
              })

              shows.sort((a, b) => {
                let date1 = a[0] + a[1]+ a[2];
                let date2 = b[0] + b[1] + b[2];
                return Number(date2) - Number(date1);
            })
            console.log({home, music, shows});
              // console.log('home array: ', home)
              // console.log('music array: ', music)
              // console.log('shows array: ', shows)
            return res.json({home, music, shows});
            // return res.json(gres.data.values)
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


//regex for youtube: /(https:\/\/youtu.be\/)(.+)/
//regex for spotify: /(https:\/\/open.spotify.com\/playlist\/)(.+)[?](.*)/


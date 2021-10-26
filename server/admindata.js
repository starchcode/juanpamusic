const { google } = require("googleapis");
const sheets = google.sheets("v4");
const admindata = require("express").Router();
const logger = require("./helperFunctions/logger");

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
admindata.get("/", async (req, res, next) => {
  const SP_ID = "173A6E2LtQgSKSRPzSB_jappnMiLzlicK8ZVaCNrkNAc";
  const SHEET = "data!";
  const GET_RANGE = "A3:Y";
  let home = [];
  let music = [];
  let shows = {upcoming: [],today: [], pastshows: []};
  let allShows = []

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
          console.log("API returned an error");
          const error = new Error( "Google API Error \n" + err.response.data.error.message);
          error.status = err.response.data.error.code;
          next(error);
        }

        if (gres.status === 200) {
          logger(`☑️  Data recieved, this is your data:` + gres.data.values);
          // console.log(gres.data.values);
          gres.data.values.forEach((element, i, arr) => {
            let homeArr = element.slice(0, 6);
            let musicArr = element.slice(7, 16);
            let showsArr = element.slice(17, 25);
            if (i === 0 && homeArr.every(Boolean) && homeArr.length == 6) {
              home.push(...homeArr);
              const ytID = home[0].match(/(https:\/\/youtu.be\/)(.+)/);
              // const spotifyID = home[1].match(
              //   /(https:\/\/open.spotify.com\/playlist\/)(.+)[?](.*)/
              // );
              home[0] = ytID ? ytID[2] : "cUCko5nDLVI";
              home[1] = "NoSpotify";
              // home[1] = spotifyID ? spotifyID[2] : "7t7eU85sSDHaw0ZAj9SXro";
            }
            if (musicArr.every(Boolean) && musicArr.length == 9) {
              const imgID = musicArr[0].match(
                /https:\/\/drive.google.com\/file\/d\/(.+)\/view/
              );
              if (imgID) {
                musicArr[0] = "https://drive.google.com/uc?id=" + imgID[1];
                music.unshift(musicArr);
              }
            }

            
            if (showsArr.every(Boolean) && showsArr.length == 8) {
              allShows.push(showsArr);
            }

          });


          allShows.sort((a, b) => {
            let date1 = new Date(a[0], Number(a[1]) - 1, a[2]);
            let date2 = new Date(b[0], Number(b[1]) - 1, b[2]);
  
            return date2 - date1;
            });

            const now = new Date(Date())
            const todaysDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            allShows.forEach(show => {
            const whenIs = new Date(show[0], Number(show[1])-1, show[2]) - todaysDate;
              if(whenIs > 0){
                  shows.upcoming.push(show)
              }else if(whenIs == 0){
                console.log('YES')
                shows.today.push(show);
              }else{
                  shows.pastshows.push(show)
              }
          })
          
          return res.json({ home, music, shows });
        }
      }
    );
  } catch (e) {
    logger(e.response || e);
    console.log("/adminData CATCH");
    console.log(e.response || e);
    return res.status(500).json({
      error: e.response || e,
    });
  }
});

module.exports = admindata;

//https://drive.google.com/uc?id=1FWrk90GWn8xZp-NGck8qjuLjptj5csel

// /https:\/\/drive.google.com\/file\/d\/(.+)\/view/

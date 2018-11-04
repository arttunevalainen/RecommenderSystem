
/**
 * npm required
 * start datafetcher by node datafetcher.js
 */


var fs = require('fs');
const axios = require('axios');
// This is to test the function with command promptgetData();
getData();

// Get the data and transform it to JSON
async function getData() {

    let usedIds = [];
    let games = {"games":[]};

    for(let i = 0; i < 1; i++) {
        let randomNumber = Math.floor(Math.random() * (260000 - 1)) + 1;
        console.log(randomNumber);
        // Make a request for a user with a given ID if ID has not been used
        if (usedIds.indexOf(randomNumber) == -1) {
          await axios.get('https://bgg-json.azurewebsites.net/thing/' + randomNumber)
          .then(function (response) {

              // Parse response to a string
              let responseString = JSON.stringify(response.data);
              console.log(responseString);
              // Add gameJson to games
              games.games.push(responseString);
              // Add ID to used ID array
              usedIds.push(randomNumber);
          })
          .catch(function (error) {
              // handle error
              i--;
              console.log("Error perror");
          });
        }
    }
    let gamesString = JSON.stringify(games);
    console.log(gamesString);
    fs.appendFile('Jsondata.json', gamesString, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
}

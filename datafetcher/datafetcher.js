
/**
 * npm required
 * start datafetcher by node datafetcher.js
 */


var fs = require('fs');
const axios = require('axios');


// This is to test the function with command promptgetData();
getData();
//showData();

// Get the data and transform it to JSON
async function getData() {

    let usedIds = [];
    let games = { "games" : [] };

    for(let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * (260000 - 1)) + 1;
        console.log(randomNumber);

        // Make a request for a user with a given ID if ID has not been used
        if (usedIds.indexOf(randomNumber) == -1) {
            await axios.get('https://bgg-json.azurewebsites.net/thing/' + randomNumber)
            .then(function (response) {

                console.log(response.data.isExpansion);
                if(response.data.isExpansion) {
                    console.log("Is Expansion so not including");
                }
                else if(response.data.rank === -1) {
                    console.log("Rank is -1 so not including");
                }
                else {
                    // Parse response to a string
                    let responseString = JSON.stringify(response.data);
                    console.log(responseString);

                    // Add gameJson to games and add ID to used ID array
                    games.games.push(responseString);
                    usedIds.push(randomNumber);
                }
            })
            .catch(function (error) {
                // handle error
                i--;
                console.log("Error fetching boardgame");
            });
        }
    }

    let gamesString = JSON.stringify(games);

    fs.writeFile('Jsondata.json', gamesString, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
}





function showData() {
    const boardgames = require('./Jsondata.json');
    console.log(JSON.parse(boardgames.games[0]));
}


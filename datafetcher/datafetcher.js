
/**
 * npm required
 * start datafetcher by node datafetcher.js
 */


const fs = require('fs');
const axios = require('axios');
const convert = require('xml-js');

// This is to test the function with command promptgetData();
//getData();
showData();

// Get the data and transform it to JSON
async function getData() {

    let usedIds = [];
    let games = { "games" : [] };

    for(let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * (260000 - 1)) + 1;
        console.log(randomNumber);

        // Make a request for a user with a given ID if ID has not been used
        //https://bgg-json.azurewebsites.net/thing/
        if (usedIds.indexOf(randomNumber) == -1) {
            await axios.get('https://www.boardgamegeek.com/xmlapi/boardgame/' + randomNumber).then(function (response) {

                let json = convert.xml2json(response.data, {compact: true, spaces: 4});
                json = JSON.parse(json);
                
                if(json.boardgames.boardgame.boardgamemechanic != undefined) {
                    console.log(json.boardgames.boardgame);

                    // Parse response to a string
                    let responseString = JSON.stringify(json.boardgames.boardgame);
                    
                    // Add gameJson to games and add ID to used ID array
                    games.games.push(responseString);
                    usedIds.push(randomNumber);
                    
                    console.log("Boardgame found and updated.");
                }
                else {
                    i--;
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




const fs = require('fs');
const gamedata = require('../datafetcher/Jsondata1000.json');


//Generates users and users rate randomly some of the boardgames in JSON.
function generateRatings() {
    const users = generateUsers();
    const gameIDs = getGameIDs();

    let userRatings = [];
    const ammountOfRatings = gameIDs.length / 10;

    users.map(function(user) {
        let usedgames = [];
        for(let i = 0; i < ammountOfRatings; i++) {
            const randomNumber = Math.floor(Math.random() * (gameIDs.length - 1)) + 1;
            const rating = Math.floor(Math.random() * (6 - 1)) + 1;
            const gameid = gameIDs[randomNumber];

            if(usedgames.indexOf(randomNumber) == -1) {
                usedgames.push(randomNumber);

                userRatings.push({
                    userid: user.id,
                    gameid: gameid,
                    rating: rating
                });
            }
        }
    });

    console.log(userRatings);
    //Saving ratings to JSON.
    let ratings = JSON.stringify(userRatings);

    fs.writeFile('Ratings1000.json', ratings, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
}

//Create users
function generateUsers() {
    let users = [];
    for(let i = 0; i < 100; i++) {
        users.push({id: i});
    }
    return users;
}

//Fetch game ids from JSON
function getGameIDs() {
    let gameIDs = [];
    gamedata.games.map(function(game) {
        gameIDs.push(parseInt(game.id));
    });
    return gameIDs;
}

generateRatings();

const gamedata = require('../datafetcher/Jsondata.json');
const userRatings = require('../userratinggenerator/Ratings.json');


//This is where we can make recommendersystem
export async function getSimilarities(gameID) {
    let similarityArray = [];
    let origGameCat = [];
    let origGameMech = [];
    let gamesToBeRecommended = [];
    let origGameDesigner;
    let origGamePlaytime;
    // Number of games the function returns
    const nroRecommendedGames = 6;

    //Get game by id
    let game;
    gamedata.games.map(function (boardgame) {
        if(boardgame.id === gameID) {
            game = boardgame;
        }
    });

    //If game was found we can search for similarities.
    if(game) {
        // Get each category from the original game to an array
        for (let i = 0; i < game.categories.length; i++) {
            origGameCat[i] = game.categories[i];
            //console.log("- " + origGameCat[i]);
        }
        // Get each mechanics from the original game to an array
        for (let i = 0; i < game.mechanics.length; i++) {
            origGameMech[i] = game.mechanics[i];
            //console.log("* " + origGameMech[i]);
        }
        origGameDesigner = game.designers;
        origGamePlaytime = game.maxplaytime;

        // Compare each game in the json-file with the game given to us
        for (let i = 0; i < gamedata.games.length; i++) {
            //console.log("------------Round: " + (i + 1));
            // Now we compare only categories and mechanics
            if (game.id != gamedata.games[i].id) {
                similarityArray[i] = compareGames(game, gamedata.games[i], origGameCat, origGameMech, origGamePlaytime, origGameDesigner);
            }
            else {
                similarityArray[i] = [game, 0];
            }
        }

        // Find the six most similar games to the original game
        // First we merely take the six first games in similarityArray to the gamesToBeRecommended array
        for (let i = 0; i < nroRecommendedGames; i++) {
            gamesToBeRecommended[i] = similarityArray[i];
        }

        // Find the lowest similarityscore
        let lowest = findLowest(gamesToBeRecommended);
        let index = 0;
        /* Check each item in similarityArray (except the six first that are already in gamesToBeRecommended
        array). If item is not the original game and has greater similarityscore than the lowest score in
        gamesToBeRecommended, swap these two. Then find the new lowest score item*/
        for (let i = gamesToBeRecommended.length; i < similarityArray.length; i ++){
            if (similarityArray[i][0] != game.id && similarityArray[i][1] > lowest[1]) {
                index = findID(gamesToBeRecommended, lowest[0].id);
                gamesToBeRecommended[index] = similarityArray[i];
                lowest = findLowest(gamesToBeRecommended);
            }
        }
        //console.log("------------------");
        //console.log(gamesToBeRecommended);

        //Remove 0% choises
        for(let i = 0; i < gamesToBeRecommended.length; i++) {
            if(gamesToBeRecommended[i][1] === 0) {
                gamesToBeRecommended.splice(i, 1);
                i--;
            }
        }

        //Sort games by similarity
        gamesToBeRecommended.sort(function (a, b) {
            return b[1] - a[1];
        });

        //Return all similarities in []
        return gamesToBeRecommended;
    }
}

// Return the index of the lowest score game in the gamesToBeRecommended array
function findID(array, id) {
    for (let j = 0; j < array.length; j++) {
        if (array[j][0].id == id) {
            return j;
        }
    }
}

// Find the game with lowest similarityscore and return it's id and score
function findLowest(array) {
    let lowest = array[0];
    for (let k = 1; k < array.length; k++) {
        if (lowest[1] > array[k][1]) {
            lowest = array[k];
        }
    }
    return lowest;
}

// Switch places of two array elements
// Currently not used anywhere
function switchPlaces(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}

/* Function to compare two games.
Returns an array with the game id and the similarityscore. */
function compareGames(originalGame, newGame, origGameCat, origGameMech, origGamePlaytime, origGameDesigner) {
    let sameCategories = 0;
    let sameMechanics = 0;
    let similarPlaytime = 0;
    let sameDesigner = 0;

    /* Count the amount of categories that match between the original game
    and the one that we want to compare */
    if (typeof newGame.categories !== "undefined" && newGame.categories[0] != null){
        for (let i = 0; i < newGame.categories.length; i++) {
            let newGameCat = newGame.categories[i];
            if (origGameCat.includes(newGameCat)) {
                sameCategories++;
            }
            //console.log("- " + newGameCat);
        }
    }
    // Repeat but with game mechanics instead of categories
    if (newGame.mechanics[0] !== null){
        for (let i = 0; i < newGame.mechanics.length; i++) {
            let newGameMech = newGame.mechanics[i];
            if (origGameMech.includes(newGameMech)) {
                sameMechanics++;
            }
            //console.log("* " + newGameMech);
        }
    }
    let totalKeywords = 0;
    // Check if games have similar playtime
    if (origGamePlaytime > 0 && newGame.maxplaytime > 0) {
        let minmaxtime = origGamePlaytime - origGamePlaytime*0.2;
        let maxmaxtime = origGamePlaytime + origGamePlaytime*0.2;
        totalKeywords += 2;
        if (minmaxtime <= newGame.maxplaytime && newGame.maxplaytime <= maxmaxtime) {
            similarPlaytime = 1;
        }
    }
    if (origGameDesigner == newGame.designers && origGameDesigner != "(Uncredited)" && !(typeof origGameDesigner === "undefined")) {
        totalKeywords += 2;
        sameDesigner++;
        console.log("Juhuu");
    }
    //console.log("     Same categories and mechanics found: " + sameCategories + ", " + sameMechanics);
    /* Calculate similarity by combining the amount of same mechanics and Categories
    and divide that with total amount of keywords in both games */
    if (newGame.categories != "undefined" && newGame.categories != null) {
        totalKeywords += newGame.categories.length;
    }
    if (newGame.mechanics != "undefined" && newGame.mechanics != null) {
        totalKeywords += newGame.mechanics.length;
    }
    totalKeywords += origGameCat.length + origGameMech.length;
    let userScore = userRater(newGame, originalGame);
    //console.log(sameMechanics + " + " + sameCategories + " / " + totalKeywords);
    let mechCat = 2*(sameMechanics + sameCategories + similarPlaytime + sameDesigner)/totalKeywords;
    //console.log("Similarity is " + mechCat);
    let similarityScore;
    if (mechCat > 0.2) {
        similarityScore = 0.85*mechCat + 0.15*userScore;
    }
    else {
        similarityScore = mechCat;
    }
    let similarity = [newGame, similarityScore];
    //console.log("Userscore: " + userScore + ", mechCat: " + mechCat + ", final score: " + similarityScore);
    return similarity;
}

function userRater(newGame, origGame) {
    let users = [];
    let score = 0;
    let reviewers = 0;
    //console.log(userRatings.length);
    //console.log(gamedata.games.length);
    for (let i = 0; i < userRatings.length; i++) {
        //console.log(userRatings[i].gameid + " , " + newGame.gameid);
        if (userRatings[i].gameid == origGame.id && userRatings[i].rating > 3) {
            users.push(userRatings[i]);
        }
    }
    for (let j = 0; j < userRatings.length; j++) {
        if (userRatings[j].gameid == newGame.id) {
            for (let i = 0; i < users.length; i++) {
                //console.log(users[i].userid + " | " + userRatings.id);
                if (users[i].userid == userRatings[j].userid) {
                    reviewers++;
                    if (userRatings[j].rating > 3) {score++;}
                    else if (userRatings[j].rating < 3) {score--;}
                }
            }
        }
    }
    if (reviewers > 0) {score = score/reviewers;}
    return score;
}

getSimilarities(gamedata.games[11].id);
//console.log(userRatings[1]);
//console.log(gamedata.games[1]);

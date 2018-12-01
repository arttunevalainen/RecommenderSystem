
const gamedata = require('../datafetcher/Jsondata.json');



//This is where we can make recommendersystem
export async function getSimilarities(gameID) {
    let similarityArray = [];
    let origGameCat = [];
    let origGameMech = [];
    let gamesToBeRecommended = [];
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

        // Compare each game in the json-file with the game given to us
        for (let i = 0; i < gamedata.games.length; i++) {
            //console.log("------------Round: " + (i + 1));
            // Now we compare only categories and mechanics
            similarityArray[i] = compareGames(game, gamedata.games[i], origGameCat, origGameMech);
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
                index = findID(gamesToBeRecommended, lowest[0]);
                gamesToBeRecommended[index] = similarityArray[i];
                lowest = findLowest(gamesToBeRecommended);
            }
        }
        //console.log("------------------");
        console.log(gamesToBeRecommended);

        
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
        if (lowest[1].id > array[k][1]) {
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
function compareGames(originalGame, newGame, origGameCat, origGameMech) {
    let sameCategories = 0;
    let sameMechanics = 0;

    /* Count the amount of categories that match between the original game
    and the one that we want to compare */
    if (newGame.categories[0] != null){
        for (let i = 0; i < newGame.categories.length; i++) {
            let newGameCat = newGame.categories[i];
            if (origGameCat.includes(newGameCat)) {
                sameCategories++;
            }
            //console.log("- " + newGameCat);
        }
    }
    // Repeat but with game mechanics instead of categories
    if (newGame.mechanics[0] != null){
        for (let i = 0; i < newGame.mechanics.length; i++) {
            let newGameMech = newGame.mechanics[i];
            if (origGameMech.includes(newGameMech)) {
                sameMechanics++;
            }
            //console.log("* " + newGameMech);
        }
    }

    //console.log("     Same categories and mechanics found: " + sameCategories + ", " + sameMechanics);
    /* Calculate similarity by combining the amount of same mechanics and Categories
    and divide that with total amount of keywords in both games */
    let totalKeywords = newGame.categories.length + newGame.categories.length + origGameCat.length + origGameMech.length;
    let mechCat = 2*(sameMechanics + sameCategories)/totalKeywords;
    let similarity = [newGame, mechCat];

    return similarity;
}

//getSimilarities(gamedata.games[7].id);

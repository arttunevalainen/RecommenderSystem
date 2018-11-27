
const gamedata = require('../datafetcher/Jsondata.json');

//This is where we can make recommendersystem
async function getSimilarities(gameID) {
    var similarityArray = [];
    var origGameCat = [];
    var origGameMech = [];
    var gamesToBeRecommended = [];
    // Number of games the function returns
    const nroRecommendedGames = 6;

    // Get each category from the original game to an array
    for (var i = 0; i < gameID.categories.length; i++) {
        origGameCat[i] = gameID.categories[i];
        console.log("- " + origGameCat[i]);
    }
    // Get each mechanics from the original game to an array
    for (var i = 0; i < gameID.mechanics.length; i++) {
        origGameMech[i] = gameID.mechanics[i];
        console.log("* " + origGameMech[i]);
    }

    // Compare each game in the json-file with the game given to us
    for (i = 0; i < gamedata.games.length; i++) {
        console.log("------------Round: " + (i + 1));
        // Now we compare only categories and mechanics
        similarityArray[i] = compareGames(gameID, gamedata.games[i], origGameCat, origGameMech);
    }

    // Find the six most similar games to the original game
    // First we merely take the six first games in similarityArray to the gamesToBeRecommended array
    for (i = 0; i < nroRecommendedGames; i++) {
        gamesToBeRecommended[i] = similarityArray[i];
    }

    // Find the lowest similarityscore
    var lowest = findLowest(gamesToBeRecommended);
    var index = 0;
    /* Check each item in similarityArray (except the six first that are already in gamesToBeRecommended
    array). If item is not the original game and has greater similarityscore than the lowest score in
    gamesToBeRecommended, swap these two. Then find the new lowest score item*/
    for (i = gamesToBeRecommended.length; i < similarityArray.length; i ++){
        if (similarityArray[i][0] != gameID.id && similarityArray[i][1] > lowest[1]) {
            index = findID(gamesToBeRecommended, lowest[0]);
            gamesToBeRecommended[index] = similarityArray[i]
            lowest = findLowest(gamesToBeRecommended);
        }
    }
    console.log("------------------");
    console.log(gamesToBeRecommended);


    // Return the index of the lowest score game in the gamesToBeRecommended array
    function findID(array, id) {
        for (j = 0; j < array.length; j++) {
            if (array[j][0] == id) {
                return j;
            }
        }
    }

    // Find the game with lowest similarityscore and return it's id and score
    function findLowest(array) {
        var lowest = array[0];
        for (k = 1; k < array.length; k++) {
            if (lowest[1] > array[k][1]) {
                lowest = array[k];
            }
        }
        return lowest;
    }

    // Switch places of two array elements
    // Currently not used anywhere
    function switchPlaces(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }

    /* Function to compare two games.
    Returns an array with the game id and the similarityscore. */
    function compareGames(originalGame, newGame, origGameCat, origGameMech) {
        var similarity = [];
        var sameCategories = 0;
        var sameMechanics = 0;

        /* Count the amount of categories that match between the original game
        and the one that we want to compare */
        if (newGame.categories[0] != null){
            for (var i = 0; i < newGame.categories.length; i++) {
                var newGameCat = newGame.categories[i];
                if (origGameCat.includes(newGameCat)) {
                    sameCategories++;
                }
                console.log("- " + newGameCat);
            }
        }
        // Repeat but with game mechanics instead of categories
        if (newGame.mechanics[0] != null){
            for (var i = 0; i < newGame.mechanics.length; i++) {
                var newGameMech = newGame.mechanics[i];
                if (origGameMech.includes(newGameMech)) {
                    sameMechanics++;
                }
                console.log("* " + newGameMech);
            }
        }

        console.log("     Same categories and mechanics found: " + sameCategories + ", " + sameMechanics);
        /* Calculate similarity by combining the amount of same mechanics and Categories
        and divide that with total amount of keywords in both games */
        var totalKeywords = newGame.categories.length + newGame.categories.length + origGameCat.length + origGameMech.length;
        var mechCat = 2*(sameMechanics + sameCategories)/totalKeywords;
        var similarity = [newGame.id, mechCat];
        return similarity;
    }


    //Return all similarities in []
    return gamesToBeRecommended;
}

getSimilarities(gamedata.games[7]);
//console.log(gamedata.games[7]);

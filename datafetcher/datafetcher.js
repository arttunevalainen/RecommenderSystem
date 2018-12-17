
/**
 * npm required
 * start datafetcher by node datafetcher.js
 */


const fs = require('fs');
const axios = require('axios');
const convert = require('xml-js');


// This is to test the function with command promptgetData();
getData();
//showData();

// Get the data and transform it to JSON
async function getData() {

    let usedIds = [];
    let games = { "games" : [] };

    for(let i = 0; i < 500; i++) {
        let randomNumber = Math.floor(Math.random() * (260000 - 1)) + 1;
        console.log(randomNumber);

        // Make a request for a user with a given ID if ID has not been used
        //https://bgg-json.azurewebsites.net/thing/
        if (usedIds.indexOf(randomNumber) == -1) {
            await axios.get('https://www.boardgamegeek.com/xmlapi/boardgame/' + randomNumber).then(function (response) {

                let json = convert.xml2json(response.data, {compact: true, spaces: 4});
                json = JSON.parse(json);

                if(json.boardgames.boardgame.boardgamemechanic != undefined) {

                    //Parsing the json
                    let boardgame = json.boardgames.boardgame;
                    boardgame.id = boardgame._attributes.objectid;

                    boardgame.yearpublished = parseInt(boardgame.yearpublished._text);
                    boardgame.minplayers = parseInt(boardgame.minplayers._text);
                    boardgame.maxplayers = parseInt(boardgame.maxplayers._text);
                    boardgame.playingtime = parseInt(boardgame.playingtime._text);
                    boardgame.minplaytime = parseInt(boardgame.minplaytime._text);
                    boardgame.maxplaytime = parseInt(boardgame.maxplaytime._text);
                    boardgame.description = boardgame.description._text;

                    if(boardgame.image) {
                        boardgame.image = boardgame.image._text;
                    }

                    if(boardgame.thumbnail) {
                        boardgame.thumbnail = boardgame.thumbnail._text;
                    }

                    // Name
                    if(Array.isArray(boardgame.name)) {
                        boardgame.name.forEach(function(name) {
                            if(name._attributes.primary) {
                                boardgame.name = name._text;
                            }
                        });
                    }
                    else {
                        boardgame.name = boardgame.name._text;
                    }

                    // Publisher
                    if(boardgame.boardgamepublisher) {
                        boardgame.publishers = [];
                        if(Array.isArray(boardgame.boardgamepublisher)) {
                            boardgame.boardgamepublisher.forEach(function(publisher) {
                                boardgame.publishers.push(publisher._text);

                            });
                        }
                        else {
                            boardgame.publishers.push(boardgame.boardgamepublisher._text);
                        }
                    }

                    // Category
                    if(boardgame.boardgamecategory) {
                        boardgame.categories = [];
                        if(Array.isArray(boardgame.boardgamecategory)) {
                            boardgame.boardgamecategory.forEach(function(category) {
                                boardgame.categories.push(category._text);

                            });
                        }
                        else {
                            boardgame.categories.push(boardgame.boardgamepublisher._text);
                        }
                    }

                    // Mechanics
                    if(boardgame.boardgamemechanic) {
                        boardgame.mechanics = [];
                        if(Array.isArray(boardgame.boardgamemechanic)) {
                            boardgame.boardgamemechanic.forEach(function(mechanic) {
                                boardgame.mechanics.push(mechanic._text);

                            });
                        }
                        else {
                            boardgame.mechanics.push(boardgame.boardgamepublisher._text);
                        }
                    }

                    // Designer
                    if(boardgame.boardgamedesigner) {
                        boardgame.designers = [];
                        if(Array.isArray(boardgame.boardgamedesigner)) {
                            boardgame.boardgamedesigner.forEach(function(designer) {
                                boardgame.designers.push(designer._text);

                            });
                        }
                        else {
                            boardgame.designers.push(boardgame.boardgamedesigner._text);
                        }
                    }

                    //Artist
                    if(boardgame.boardgameartist) {
                        boardgame.artists = [];
                        if(Array.isArray(boardgame.boardgameartist)) {
                            boardgame.boardgameartist.forEach(function(artist) {
                                boardgame.artists.push(artist._text);

                            });
                        }
                        else {
                            boardgame.artists.push(boardgame.boardgameartist._text);
                        }
                    }

                    //Family
                    if(boardgame.boardgamefamily) {
                        boardgame.family = [];
                        if(Array.isArray(boardgame.boardgamefamily)) {
                            boardgame.boardgamefamily.forEach(function(family) {
                                boardgame.family.push(family._text);

                            });
                        }
                        else {
                            boardgame.family.push(boardgame.boardgamefamily._text);
                        }
                    }

                    //Expansions
                    if(boardgame.boardgameexpansion) {
                        boardgame.expansions = [];
                        if(Array.isArray(boardgame.boardgameexpansion)) {
                            boardgame.boardgameexpansion.forEach(function(expansion) {
                                boardgame.expansions.push(expansion._text);

                            });
                        }
                        else {
                            boardgame.expansions.push(boardgame.boardgameexpansion._text);
                        }
                    }

                    //DELETE unnessessary information
                    delete boardgame._attributes;
                    delete boardgame.poll;
                    delete boardgame.boardgamecategory;
                    delete boardgame.boardgamedesigner;
                    delete boardgame.boardgamemechanic;
                    delete boardgame.boardgamepublisher;
                    delete boardgame.boardgameversion;
                    delete boardgame.boardgamefamily;
                    delete boardgame.boardgameartist;
                    delete boardgame.boardgameexpansion;
                    delete boardgame.boardgamesubdomain;
                    delete boardgame.boardgamepodcastepisode;
                    delete boardgame.boardgameimplementation;
                    delete boardgame.boardgamehonor;
                    delete boardgame.boardgameintegration;

                    console.log(boardgame);

                    // Parse response to a string
                    //let responseString = JSON.stringify(boardgame);

                    // Add gameJson to games and add ID to used ID array
                    games.games.push(boardgame);
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
                console.log(error);
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


//Imports
import React from 'react';
import Head from 'next/head';

import BoardgameCard from './BoardgameCard.js';


const listContainer = {
    margin: 'auto',
    textAlign: 'center',
}

class Boardgamelist extends React.Component {

    //Renders searched boardgames
    renderBoardgames() {
        if(this.props.games) {
            let cards = this.props.games.map(function(game) {
                //let jsongame = JSON.parse(game);
                return <BoardgameCard gamedata={game} key={game.name}></BoardgameCard>
            });
            
            return <div style={listContainer}>{cards}</div>
        }
        else {
            return <div>Loading boardgames...</div>
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                </Head>

                <style jsx global>{`
                    body { 
                        background: burlywood;
                        color: black
                    }`}
                </style>

                {this.renderBoardgames()}
            </div>
        )
    }
}

export default Boardgamelist;
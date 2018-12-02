
//Imports
import React from 'react';
import autoBind from 'react-autobind';
import Head from 'next/head';

import Boardgamelist from './components/Boardgamelist.js';

import './styles/styles.css';

//Styles
const searchInput = {
    width: '400px',
    height: '30px',
    marginBottom: '20px'
}

const footer = {
    position: 'absolute',
    bot: '5px',
    left: '30px'
}


class Index extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { boardgamesearch: "" };

        autoBind(this);
    }

    //Before component is rendered
    componentDidMount() {
        this.getData().then((data) => {
            this.setState({games: data.games});
        });
    }

    //Fetch json
    async getData() {
        return await import('../datafetcher/Jsondata.json');
    }

    //Handle changes in search field
    handleChange(event) {
        if(event.target.value.length > this.state.boardgamesearch.length) {
            this.setState({ boardgamesearch: event.target.value });

            this.changeGamesJSON();
        }
        else if(event.target.value.length < this.state.boardgamesearch.length) {
            this.setState({ boardgamesearch: event.target.value });

            this.getData().then((data) => {
                this.setState({games: data.games});

                this.changeGamesJSON();
            });
        }
    }

    //Manipulates games json file to match search.
    changeGamesJSON() {
        let games = this.state.games;
        let newgames = [];

        for(let i = 0; i < games.length; i++) {
            let jsongame = games[i];

            //Change all to lowercase for search purposes.
            let gamename = jsongame.name;
            gamename = gamename.toLowerCase();
            let searchvalue = event.target.value;
            searchvalue = searchvalue.toLowerCase();
            
            if(gamename.includes(searchvalue)) {
                newgames.push(jsongame);
            }
        }
        this.setState({ games: newgames });
    }

    render() {
        return (
            <div className="mainContainer">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                </Head>

                <style jsx global>{`
                    body { 
                        background: burlywood;
                        color: black;
                    }`}
                </style>

                <h2>Boardgame Recommender System</h2>

                <h4>Search:</h4>
                <input onChange={this.handleChange} style={searchInput}></input>

                <Boardgamelist search={this.state.boardgamesearch} games={this.state.games}></Boardgamelist>
                
                <p style={footer}>By Timo Tuulio and Arttu Nevalainen</p>
            </div>
        )
    }
}


export default Index;
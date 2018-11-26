
//Imports
import React from 'react';

import Head from 'next/head';
import autoBind from 'react-autobind';

import ListProps from './components/ListProps.js';

const imagesrc = "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png";


class Boardgamepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {game: null};

        autoBind(this);
    }

    static getInitialProps({ query }) {
        return { query }
    }

    //Before component is rendered
    componentDidMount() {
        this.getData().then((data) => {
            this.getThisBoardgame(data);
        });
    }

    //Fetch json
    async getData() {
        return await import('../datafetcher/Jsondata.json');
    }

    getThisBoardgame(data) {
        data.games.forEach(game => {
            //let boardgame = JSON.parse(game);
            if(game.id === this.props.query.id) {
                this.setState({game: game});
            }
        });
    }

    renderThisGame() {
        if(this.state.game) {
            console.log(this.state.game);
            return (
                <div>
                    <div>Game id: {this.state.game.id}</div>
                    <div>
                        <h4>{this.state.game.name}</h4>
                        {this.state.game.thumbnail && <img src={this.state.game.thumbnail}></img>}
                        {!this.state.game.thumbnail && <img src={imagesrc}></img>}
                    </div>

                    <ListProps listprops={this.state.game.categories} listname="Categories"></ListProps>
                    <ListProps listprops={this.state.game.mechanics} listname="Mechanics"></ListProps>
                    <ListProps listprops={this.state.game.designers} listname="Designers"></ListProps>
                    <ListProps listprops={this.state.game.artists} listname="Artists"></ListProps>
                    <ListProps listprops={this.state.game.publishers} listname="Publishers"></ListProps>
                    <div>
                        <h5>Description:</h5>
                        {this.state.game.description}
                    </div>
                    <div>
                        <h5>Published:</h5>
                        {this.state.game.yearpublished}
                    </div>
                    {this.renderPlaytime(this.state.game)}
                    
                </div>
            );
        }
        else {
            return <div>Loading...</div>
        }
    }

    //Renders playtime correctly according to playtimes.
    renderPlaytime(game) {
        let playtime = "";
        if(game.minplaytime === game.maxplaytime) {
            playtime = <p>{game.maxplaytime}</p>
        }
        else {
            playtime = <p>{game.minplaytime} - {game.maxplaytime}</p>
        }

        return (
            <div>
                <h5>Playtime:</h5>
                {playtime}
            </div>
        );
    }

    render() {
        return (
            <div >
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                </Head>


                {this.renderThisGame()}
            </div>
        );
    }
}

export default Boardgamepage;


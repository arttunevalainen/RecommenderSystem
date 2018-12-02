
//Imports
import { Component } from 'react';

import Head from 'next/head';
import autoBind from 'react-autobind';

import ListProps from './components/ListProps.js';
import Recommendations from './components/Recommendations.js';


const imagesrc = "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png";



const flexbody = {
    display: 'flex'
}

const row = {
    flexDirection: 'row',
    display: 'flex',
    width: '100%'
}

const rowComponent = {
    width: '100px'
}

const thumbnailComponent = {
    marginRight: '20px',
    flexDirection: 'column',
    display: 'flex',
}

const descriptionstyles = {
    margin: '30px'
}



class Boardgamepage extends Component {

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

                    <div style={flexbody}>
                        <div style={thumbnailComponent}>
                            <h4>{this.state.game.name}</h4>
                            {this.state.game.thumbnail && <img src={this.state.game.thumbnail}></img>}
                            {!this.state.game.thumbnail && <img src={imagesrc}></img>}
                        </div>

                        <div style={row}>
                            <ListProps style={rowComponent} listprops={this.state.game.categories} listname="Categories"></ListProps>
                            <ListProps style={rowComponent} listprops={this.state.game.mechanics} listname="Mechanics"></ListProps>
                            {this.state.game.designers && <ListProps style={rowComponent} listprops={this.state.game.designers} listname="Designers"></ListProps>}
                            {this.state.game.artists && <ListProps style={rowComponent} listprops={this.state.game.artists} listname="Artists"></ListProps>}
                            {this.state.game.publishers && <ListProps style={rowComponent} listprops={this.state.game.publishers} listname="Publishers"></ListProps>}

                            <div style={rowComponent}>
                                <h5>Published:</h5>
                                {this.state.game.yearpublished}
                            </div>
                            {this.renderPlaytime()}
                        </div>
                    </div>

                    <div style={descriptionstyles}>
                        <h5>Description:</h5>
                        {this.state.game.description}
                    </div>
                </div>
            );
        }
        else {
            return <div>Loading...</div>
        }
    }

    //Renders playtime correctly according to playtimes.
    renderPlaytime() {
        let game = this.state.game;
        let playtime = "";
        if(game) {
            if(game.minplaytime === game.maxplaytime) {
                playtime = <p>{game.maxplaytime}</p>
            }
            else {
                playtime = <p>{game.minplaytime} - {game.maxplaytime} minutes.</p>
            }
    
            return (
                <div style={rowComponent}>
                    <h5>Playtime:</h5>
                    {playtime}
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    render() {
        console.log(this.state.game);
        return (
            <div>
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

                {this.renderThisGame()}
                
                {this.state.game && <Recommendations game={this.state.game}></Recommendations>}
            </div>
        );
    }
}

export default Boardgamepage;


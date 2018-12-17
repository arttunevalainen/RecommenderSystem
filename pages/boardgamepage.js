
//Imports
import { Component } from 'react';

import Head from 'next/head';
import autoBind from 'react-autobind';

import PropList from './components/PropList.js';
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

const publisherAndPlayTimeRow = {
    flexDirection: 'row',
    display: 'flex',
    width: '100%'
}

const thumbnailComponent = {
    marginRight: '20px',
}

const publisherAndPlayTime = {
    width: '20%',
}

const descriptionstyles = {
    marginRight: '30px'
}

const pagestyles = {
    marginLeft: '30px'
}

const publisherAndPlayTimeTitle = {
    marginTop: '20px',
    fontSize: '121%'
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
            // <Link href="/" replace><a>Go to frontpage</a></Link>
            return (
                <div style={pagestyles}>

                    <div>Game id: {this.state.game.id}</div>

                    <div style={thumbnailComponent}>
                            <h4>{this.state.game.name}</h4>
                            {this.state.game.thumbnail && <img src={this.state.game.thumbnail}></img>}
                            {!this.state.game.thumbnail && <img src={imagesrc}></img>}
                        </div>

                    <div style={flexbody}>
                        <div style={row}>
                            <PropList listprops={this.state.game.categories} listname="Categories"></PropList>
                            <PropList listprops={this.state.game.mechanics} listname="Mechanics"></PropList>
                            {this.state.game.designers && <PropList listprops={this.state.game.designers} listname="Designers"></PropList>}
                            {this.state.game.artists && <PropList listprops={this.state.game.artists} listname="Artists"></PropList>}
                            
                        </div>
                    </div>

                     <div style={publisherAndPlayTimeRow}>
                        <div style={publisherAndPlayTime}>
                            <h5 style={publisherAndPlayTimeTitle}>Published:</h5>
                            <p>{this.state.game.yearpublished}</p>
                        </div>

                        {this.state.game.publishers && <PropList listprops={this.state.game.publishers} listname="Publishers"></PropList>}
                        
                        {this.renderPlaytime()}
                    </div>

                    {this.renderDescription()}
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
                if(game.maxplaytime === 0) {
                    playtime = <p>-</p>
                }
                else {
                    playtime = <p>{game.maxplaytime}</p>
                }
                
            }
            else {
                playtime = <p>{game.minplaytime} - {game.maxplaytime} minutes.</p>
            }
    
            return (
                <div style={publisherAndPlayTime}>
                    <h5 style={publisherAndPlayTimeTitle}>Playtime:</h5>
                    {playtime}
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    renderDescription() {

        let line = this.state.game.description.replace(/<[^>]+>/g, '\n');
        line = line.replace(/&quot;/g, '"');
        
        return (
            <div style={descriptionstyles}>
                <h5>Description:</h5>
                <p>{line}</p>
            </div>
        );
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
                        background: #f7faff;
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


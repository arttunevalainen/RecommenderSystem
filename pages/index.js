
//Imports
import React from 'react';
import autoBind from 'react-autobind';
import Head from 'next/head';

import Boardgamelist from './components/Boardgamelist.js';

//import datafetcher from './datafetcher/Jsondata.json';
import './styles/styles.css';


class Index extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { boardgamesearch: "" };

        autoBind(this);
    }

    handleChange(event) {
        this.setState({ boardgamesearch: event.target.value });
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

                <h2>Recommender System</h2>

                Search: <input onChange={this.handleChange}></input>

                <Boardgamelist search={this.state.boardgamesearch}></Boardgamelist>
            </div>
        )
    }
}


export default Index;
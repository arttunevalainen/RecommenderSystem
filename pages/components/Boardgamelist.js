
//Import new component.
import React from 'react';

import Head from 'next/head';

import '../styles/styles.css';

class Boardgamelist extends React.Component {

    async getData() {
        return await import('../../datafetcher/Jsondata.json');
    }

    renderBoardgames() {

        //Get from json and render them to boardgamelist
        this.getData().then((data) => {
            console.log(data.games[0]);
        });
        
        return <div>{this.props.search}</div>
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
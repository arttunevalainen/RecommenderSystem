
//Import new component.
import Link from './Link.js';

import React from 'react';
import autoBind from 'react-autobind';
import Head from 'next/head';
import Navigation from './navigation.js'
import Counter from './Counter.js';

import './styles.css';


class Index extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { number: 0 };

        autoBind(this);
    }

    buttonClick() {
        let number = this.state.number + 1;
        this.setState({ number: number });
    }

    //Example of multiple same components
    allLinks() {

        let links = [];

        for(let i = 0; i < 4; i++) {
            links.push(<Link key={i}></Link>);
        }

        return links;
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

                <Navigation></Navigation>

                {this.allLinks()}

                <Counter
                    number={this.state.number}
                    buttonClick={this.buttonClick}
                ></Counter>
            </div>
        )
    }
}


export default Index;
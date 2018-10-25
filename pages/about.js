
//Import new component.
import React from 'react';

import Head from 'next/head';
import Navigation from './navigation.js'

import './styles.css';


class About extends React.Component {

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

                <h2>About</h2>

                <Navigation></Navigation>

                <p>Tää on about!</p>
            </div>
        )
    }
}


export default About;
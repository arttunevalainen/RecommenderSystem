
//Imports
import React from 'react';

import Head from 'next/head';
import autoBind from 'react-autobind';


class Boardgamepage extends React.Component {

    constructor(props) {
        super(props);

        autoBind(this);
    }

    static getInitialProps({ query }) {
        return { query }
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

    render() {
        return (
            <div >

                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                </Head>

                Boardgame id for this page is {this.props.query.id}
            </div>
        );
    }
}

export default Boardgamepage;


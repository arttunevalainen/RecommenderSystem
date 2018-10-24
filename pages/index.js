
import Link from './Link.js';
import React from 'react';
import autoBind from 'react-autobind';


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

    allLinks() {

        let links = [];

        for(let i = 0; i < 4; i++) {
            links.push(<Link key={i}></Link>);
        }

        return links;
    }

    render() {
        return (
            <div>
                {this.allLinks()}

                Number: {this.state.number}
                <button onClick={this.buttonClick}>Plus</button>
            </div>
        )
    }
}


export default Index;
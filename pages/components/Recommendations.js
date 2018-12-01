
//Imports
import React from 'react';

import RecommendedItem from './RecommendedItem.js';
import { getSimilarities } from '../../recommendersalgorithm/recommendersystem.js';

import autoBind from 'react-autobind';



const recommendBox = {
    display: "flex"
};

const recommendedItem = {
    flex: 1
};


class Recommendations extends React.Component {

    constructor(props) {
        super(props);

        this.state = { recommends: null };

        autoBind(this);
    }

    componentDidMount() {
        this.getRecommends();
    }

    async getRecommends() {
        let recommends = await getSimilarities(this.props.game.id);
        console.log(recommends);
        this.setState({ recommends: recommends });
    }

    renderRecommendations() {
        if(this.state.recommends) {
            return <div></div>
        }
        else {
            return <div>Loading recommendations...</div>
        }
    }

    render() {
        return (
            <div style={recommendBox}>
                <h3>If you like this game, you could also like:</h3>
                {this.state.recommends && this.renderRecommendations()}
            </div>
        );
    }
}



export default Recommendations;

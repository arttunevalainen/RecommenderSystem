
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

            let recommendedItems = this.state.recommends.map(function(item) {
                return <RecommendedItem style={recommendedItem} key={item[0].id} item={item}></RecommendedItem>
            });
    
            return <div style={recommendBox}>{recommendedItems}</div>
        }
        else {
            return <div>Loading recommendations...</div>
        }
    }

    render() {
        return (
            <div>
                <h3>If you like this game, you could also like:</h3>
                {this.state.recommends && this.renderRecommendations()}
            </div>
        );
    }
}



export default Recommendations;

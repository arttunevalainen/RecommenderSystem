
//Imports
import React from 'react';


const imagesrc = "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png";

const thumbnailimage = {
    width: "30%",
    height: "30%"
};


class RecommendedItem extends React.Component {

    similarityRender() {
        if(this.props.item) {
            const percentage = this.props.item[1] * 100;
            return (
                <p>Similarity {percentage} %</p>
            );
        }
        else {
            <p>Loading...</p>
        }
    }

    render() {
        return (
            <div>
                <p>{this.props.item[0].name}</p>
                {this.props.item[0].thumbnail && <img style={thumbnailimage} src={this.props.item[0].thumbnail}></img>}
                {!this.props.item[0].thumbnail && <img style={thumbnailimage} src={imagesrc}></img>}
                {this.similarityRender()}
            </div>
        );
    }
}


export default RecommendedItem;


//Imports
import React from 'react';
import Link from 'next/link';

const imagesrc = "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png";

const thumbnailimage = {
    width: "70%",
    height: "100px"
};

const recommendedItem = {
    borderRadius: '5px',
    margin: '0px',
    width: '33%',
    height: '200px',
    cursor: 'pointer'
}


class RecommendedItem extends React.Component {

    renderSimilarity() {
        if(this.props.item) {
            const number = parseFloat(this.props.item[1].toFixed(2));
            const percentage = number * 100;
            return (
                <p>Similarity {percentage} %</p>
            );
        }
        else {
            <p>Loading...</p>
        }
    }

    roundNumber(num, scale) {
        if(!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + scale)  + "e-" + scale);
        } 
        else {
            var arr = ("" + num).split("e");
            var sig = ""
            if(+arr[1] + scale > 0) {
                sig = "+";
            }

            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }

    render() {
        const href = "/boardgame/" + this.props.item[0].id + "/";

        return (
            <Link href={href}>
                <div style={recommendedItem}>
                    <p>{this.props.item[0].name}</p>
                    {this.props.item[0].thumbnail && <img style={thumbnailimage} src={this.props.item[0].thumbnail}></img>}
                    {!this.props.item[0].thumbnail && <img style={thumbnailimage} src={imagesrc}></img>}
                    {this.renderSimilarity()}
                </div>
            </Link>
        );
    }
}


export default RecommendedItem;

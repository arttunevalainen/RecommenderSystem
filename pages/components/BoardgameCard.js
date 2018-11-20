
//Imports
import React from 'react';

import ListProps from './ListProps.js';


const imagesrc = "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png";

/** Styles */
const col = {
    flex: 1,
    margin: "auto"
};

const thumbnailimage = {
    width: "50%",
    height: "50%"
};

const boardgamecardstyle = {
    backgroundColor: "white",
    borderRadius: "15px",
    display: "flex",
    margin: "5px",
};


class BoardgameCard extends React.Component {

    render() {
        return (
            <div style={boardgamecardstyle}>

                <style jsx global>{`
                    body { 
                        background: white
                        color: black
                    }`}
                </style>

                <div style={col}>
                    <h4>{this.props.gamedata.name}</h4>
                    {this.props.gamedata.thumbnail && <img style={thumbnailimage} src={this.props.gamedata.thumbnail}></img>}
                    {!this.props.gamedata.thumbnail && <img style={thumbnailimage} src={imagesrc}></img>}
                </div>

                <ListProps listprops={this.props.gamedata.categories} listname="Categories"></ListProps>
                <ListProps listprops={this.props.gamedata.mechanics} listname="Mechanics"></ListProps>

                <div style={col}>
                    <div>
                        <h5>Designer:</h5>
                        {this.props.gamedata.designers}
                    </div>
                    <div>
                        <h5>Publisher:</h5>
                        {this.props.gamedata.publishers}
                    </div>
                </div>
               
            </div>
        )
    }
}


export default BoardgameCard;
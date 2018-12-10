
//Imports
import React from 'react';

import Link from 'next/link';

import PropList from './PropList.js';


const imagesrc = "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png";

/** Styles */
const designerAndPublisher = {
    fontSize: '80%',
    flex: 1,
    width: '30%',
    margin: '0px',
    marginTop: '20px',
    marginBottom: '20px'
}

const titleAndImage = {
    width: '30%',
    margin: '0px',
    marginTop: '20px',
    marginBottom: '20px'
}

const thumbnailimage = {
    width: '50%',
    height: '50%'
};

const smallText = {
    fontSize: '17px'
}

const boardgamecardstyle = {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: '15px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    marginBottom: '10px'
};

const boardgamename = {
    fontSize: '130%'
};

const title = {
    marginTop: '0px'
};


class BoardgameCard extends React.Component {

    render() {
        const href = "/boardgame/" + this.props.gamedata.id + "/";

        return (
            <Link href={href}>
                <div style={boardgamecardstyle}>

                    <style jsx global>{`
                        body {
                            background: white
                            color: black
                        }`}
                    </style>

                    <div style={titleAndImage}>
                        <h4 style={boardgamename}>{this.props.gamedata.name}</h4>
                        {this.props.gamedata.thumbnail && <img style={thumbnailimage} src={this.props.gamedata.thumbnail}></img>}
                        {!this.props.gamedata.thumbnail && <img style={thumbnailimage} src={imagesrc}></img>}
                    </div>

                    <PropList listprops={this.props.gamedata.categories} listname="Categories"></PropList>
                    <PropList listprops={this.props.gamedata.mechanics} listname="Mechanics"></PropList>

                    <div style={designerAndPublisher}>
                        <div>
                            <h5 style={title}>Designer:</h5>
                            <p style={smallText}>{this.props.gamedata.designers}</p>
                        </div>
                        <div>
                            <h5 style={title}>Publisher:</h5>
                            <p style={smallText}>{this.props.gamedata.publishers}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}


export default BoardgameCard;

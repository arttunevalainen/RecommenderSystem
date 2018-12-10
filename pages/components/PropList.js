
//Imports
import React from 'react';


/** Styles */
const col = {
    fontSize: '100%',
    width: '20%',
    margin: '0px',
    marginTop: '20px',
    marginBottom: '20px'
};

const liststyle = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
};

const listItem = {
    fontSize: '17px'
}

const title = {
    marginTop: '0px'
}

class PropList extends React.Component {

    renderList() {

        if(this.props.listprops) {
            let listitems = this.props.listprops.map(function(item) {
                return <li style={listItem} key={item}>{item}</li>
            });
    
            return <ul style={liststyle}>{listitems}</ul>
        }
        else {
            return <div></div>
        }
    }

    render() {
        return (
            <div style={col}>
                <h5 style={title}>{this.props.listname}:</h5>
                {this.renderList()}
            </div>
        );
    }
}

export default PropList;

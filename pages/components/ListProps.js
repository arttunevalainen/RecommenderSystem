
//Imports
import React from 'react';


/** Styles */
const col = {
    marginTop: "1em",
    fontSize: '100%'
};

const liststyle = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
};

const listitem = {
    width: '125px'
}

class ListProps extends React.Component {

    renderList() {

        if(this.props.listprops) {
            let listitems = this.props.listprops.map(function(item) {
                return <li style={listitem} key={item}>{item}</li>
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
                <h5>{this.props.listname}:</h5>
                {this.renderList()}
            </div>
        );
    }
}

export default ListProps;

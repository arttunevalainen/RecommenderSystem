
//Imports
import React from 'react';


/** Styles */
const col = {
    flex: 1,
    marginTop: "1em"
};

const liststyle = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
};

class ListProps extends React.Component {

    renderList() {

        if(this.props.listprops) {
            let listitems = this.props.listprops.map(function(item) {
                return <li key={item}>{item}</li>
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

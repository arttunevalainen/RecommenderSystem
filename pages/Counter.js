
import React from 'react';


class Counter extends React.Component {

    render() {

        return (
            <div>
                Number: {this.props.number}
                <button onClick={this.props.buttonClick}>Plus</button>
            </div>
        );
    }
}

export default Counter;
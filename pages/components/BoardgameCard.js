
//Imports
import React from 'react';

class BoardgameCard extends React.Component {

    renderCategories() {

        let cat = this.props.gamedata.categories.map(function(category) {
            return <li key={category}>{category}</li>
        });
        
        return <div>Categories:<ul>{cat}</ul></div>
    }

    renderMechanics() {

        let mec = this.props.gamedata.mechanics.map(function(mechanic) {
            return <li key={mechanic}>{mechanic}</li>
        })


        return <div>Mechanics:<ul>{mec}</ul></div>
    }

    render() {
        return (
            <div>

                <style jsx global>{`
                    body { 
                        background: white
                        color: black
                    }`}
                </style>

                <h4>{this.props.gamedata.name}</h4>
                {this.renderCategories()}
                {this.renderMechanics()}
               
            </div>
        )
    }
}

export default BoardgameCard;
import React, {Component} from 'react';
import '../App.css';

class Rules extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.rules = ['Do not cheat, I guess?',
        'One Person plays per Account',
        'Answering questions unlocks new paths',
        'The end goal is to get to the Exit'
        ]
    }

    render(){
        return(
            <div>
                <div className = "leaderboardsMain">
                    <div className = "header">
                        Rules
                    </div>
                    <div className = "leaderWrapper">
                    {
                        this.rules.map(
                            function(element, ind){
                                return (
                                    <div className = "peopleBoard">
                                        {element}
                                    </div>
                                )
                            }
                        )
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Rules;

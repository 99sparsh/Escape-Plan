import React, {Component} from 'react';
import Navbar from "./Navbar";
import '../App.css';

class Rules extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.rules = [
        'Do not cheat, I guess?',
        'One Person plays per Account',
        'Answering questions unlocks new paths',
        'The end goal is to get to the Exit'
        ]
    }

    render(){
        return(
            <div>
                <Navbar/>
                <div className = "rules">
                    <div className = "header">
                        Rules
                    </div>
                    <div className = "rulesWrapper">
                    {
                        this.rules.map(
                            function(element){
                                return (
                                    <li className = "ruleno">
                                        {element}
                                    </li>
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

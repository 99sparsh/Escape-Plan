import React, {Component} from 'react';
import '../App.css';

class Account extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'Liz Lemon',
            regno: '940711279',
            points: 30,
            level: 5
        };
    }

    render(){
        return(
            <div className = "leaderboardsMain">
                <div className = "header">
                    Account
                </div>
                <div className = "peopleWrapper">
                    <div>
                        Name: {this.state.name}
                    </div>
                    <div>
                        Registration Number: {this.state.regno}
                    </div>
                    <div>
                        Points: {this.state.points}
                    </div>
                    <div>
                        Level: {this.state.level}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Account;
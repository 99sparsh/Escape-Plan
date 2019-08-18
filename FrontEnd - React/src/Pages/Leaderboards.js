import React,{Component} from 'react';
import '../App.css';

class Leaderboards extends Component{

    constructor(){
        super()
        this.state = {
            people: ['Luke', 'Rey', 'Finn', 'Yoda', 'Anakin']
        }
    }

    render(){
        return(
            <div>
                <div className = "leaderboardsMain">
                    <div className = "header">
                        Leaderboards
                    </div>
                    <div className = "leaderWrapper">
                    {
                        this.state.people.map(
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

export default Leaderboards;
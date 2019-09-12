import React,{Component} from 'react';
import Navbar from "./Navbar";
import '../App.css';

class Leaderboards extends Component{

    constructor(){
        super()
        this.state = {
            people: ['Luke', 'Rey', 'Finn', 'Yoda', 'Anakin','sass','aaa','aaaaaa', 'Yoda', 'Anakin','sass','aaa','aaaaaa']
        }
    }

    render(){
        return(
            <div>
                <Navbar/>
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
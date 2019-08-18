import React, {Component} from 'react';
import '../App.css';
import maze from '../maze1.jpeg';

class Maze extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "leaderboardsMain">
                <img src = {maze} width = {350} height = {350} />
            </div>
        )
    }
}

export default Maze;
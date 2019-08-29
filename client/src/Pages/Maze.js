import React, { Component } from 'react'
import "./Maze.css"
export default class Maze extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rank : 0,
            maze: [
                ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
                ['w', 'b', 'b', 'b', 8, 'b', 'b', 9, 'b', 'b', 15, 'b', 'w', 'b', 'b', 'b', 17, 'b', 19, 'b', 'b', 'b', 27, 'b', 'w'],
                ['w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 18, 'w', 'w', 'w', 'w', 'w', 'b', 'w'],
                ['w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 16, 'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w'],
                ['w', 'w', 'w', 7, 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'b', 'w'],
                ['w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 10, 'b', 'w', 'b', 'w', 'b', 20, 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'b', 'b', 'w'],
                ['w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 26, 'w', 'w', 'w'],
                ['w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'b', 'b', 'w', 'w', 'w', 'b', 'b', 'b', 22, 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'w'],
                ['w', 'w', 'w', 6, 'w', 'w', 'w', 'w', 'w', 11, 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'b', 'w', 25, 'w'],
                ['w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'w'],
                ['w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 21, 'w', 'w', 'w', 'w', 'w', 23, 'w', 'w', 'w', 'b', 'w'],
                ['w', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 12, 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'b', 'b', 'w'],
                ['w', 'w', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 13, 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 24, 'w', 'w', 'w'],
                ['w', 'b', 'b', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w'],
                ['w', 4, 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b', 'w'],
                ['w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'b', 'b', 'w', 'b', 'w'],
                ['w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 14, 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'b', 'w'],
                ['w', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 5, 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 28, 'b', 'w'],
                ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 29, 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
                ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w'],
                ['w', 'w', 'w', 'b', 'w', 1, 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w'],
                ['w', 'b', 'b', 'b', 2, 'b', 3, 'b', 'w', 'b', 'b', 'b', 30, 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w'],
                ['w', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'b', 'w'],
                ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 31, 'b', 'b', 'b', 'b', 'b', 'w', 'b', 'b', 'b', 'w'],
                ['w', 'w', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ],
            colors: {}
        }
    }
    clicked = (cell) => {
        
        if(this.state.colors['visible'].includes(cell)){
            console.log(`Question Number ${cell}`);
            this.props.history.push(`/play/${cell}`)      
        }
        else if(this.state.colors['invisible'].includes(cell)){
            console.log("Question isn't available")
        } 
        else{
            console.log("You've Solved this question")
        }
        
    }

    componentDidMount() {
        // const that = this
        fetch('/play/colors')
        .then(
            resp => {return resp.json()}
        ).then(
            data => {
                this.setState({colors: data.data})
                console.log("Ready!")
                console.log(this.state.colors['invisible'])
            }
        ).catch(
            err => console.log(err)
        )
        fetch('/play/rank',{
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(
            resp => {return resp.json()}
        ).then(
            data =>{ 
                console.log(data);
                this.setState({ranks:data})
            }
        ).catch(
            err => console.log(err)
        )
    }


    
    render() {
        const numberToTile = (cell, j) => {
            switch (cell) {
                case 'w': return <div className="black tile" key={j}><span className="placeholder">S</span></div>;
                case 'b': return <div className="white tile" key={j}><span className="placeholder">S</span></div>;
                default: {
                    /* The rest are question numbers */
                    return <div className="orange tile" onClick={() => this.clicked(cell)} key={j}><span className="placeholder">S</span></div>
                }
            }
        }
        return (
            <div>
            <div className="mazeWrapper">
                {this.state.maze.map((row, i) => <div className="row" key={i}> {row.map((cell, j) => numberToTile(cell, j))} </div>)}
            </div>
            <div className = "rank">
                {this.state.ranks}
            </div>
            </div>

        )
    }
}
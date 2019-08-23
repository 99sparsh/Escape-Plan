import React, { Component } from 'react'
import "./Maze.css"
export default class Maze extends Component {
    constructor(props){
        super(props)
        this.state = {
           maze:[
               ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b','w','w','w','w','w','w','w'],
               ['w','b','b','b', 8, 'b','b', 9 ,'b','b', 15,'b','w','b','b','b', 17,'b', 19,'b','b','b', 27,'b','w'],
               ['w','b','w','w','w','w','w','w','w','b','w','b','w','w','w','b','w', 18,'w','w','w','w','w','b','w'],
               ['w','b','b','b','w','b','b','b','b','b','w','b','b','b', 16,'b','w','b','w','b','w','b','w','b','w'],
               ['w','w','w', 7, 'w','w','w','w','w','b','w','b','w','w','w','w','w','b','w','w','w','w','w','b','w'],
               ['w','b','b','b','w','b','b','b', 10,'b','w','b','w','b', 20,'b','b','b','w','b','b','b','b','b','w'],
               ['w','w','w','b','w','b','w','w','w','w','w','b','w','b','w','w','w','w','w','w','w', 26,'w','w','w'],
               ['w','b','b','b','w','b','b','b','b','b','w','w','w','b','b','b', 22,'b','b','b','w','b','b','b','w'],
               ['w','w','w', 6, 'w','w','w','w','w', 11,'w','w','w','b','w','w','w','b','w','b','w','b','w', 25,'w'],
               ['w','b','w','b','b','b','w','b','w','b','b','b','w','b','w','b','w','b','b','b','w','b','w','b','w'],
               ['w','w','w','b','w','b','w','w','w','b','w','w','w', 21,'w','w','w','w','w', 23,'w','w','w','b','w'],
               ['w','b','w','b','w','b','b','b','w','b','b','b', 12,'b','b','b','w','b','w','b','b','b','b','b','w'],
               ['w','w','w','b','w','w','w','b','w', 13,'w','w','w','w','w','b','w','w','w','w','w', 24,'w','w','w'],
               ['w','b','b','b','b','b','w','b','w','b','b','b','w','b','w','b','b','b','w','b','w','b','b','b','w'],
               ['w', 4, 'w','w','w','w','w','b','w','b','w','w','w','b','w','w','w','w','w','w','w','w','w','b','w'],
               ['w','b','b','b','w','b','b','b','w','b','w','b','b','b','w','b','w','b','b','b','b','b','w','b','w'],
               ['w','w','w','b','w','w','w','w','w', 14,'w','b','w','w','w','b','w','b','w','w','w','b','w','b','w'],
               ['w','b','w','b','w','b','b','b', 5 ,'b','w','b','w','b','b','b','w','b','w','b','b','b', 28,'b','w'],
               ['w','b','w','b','w','b','w','w','w','b','w','b','w','w','w','w','w', 29,'w','w','w','w','w','w','w'],
               ['w','b','w','b','w','b','w','b','b','b','w','b','b','b','w','b','b','b','w','b','w','b','b','b','w'],
               ['w','w','w','b','w', 1 ,'w','w','w','w','w','w','w','w','w','w','w','b','w','b','w','w','w','b','w'],
               ['w','b','b','b', 2, 'b', 3 ,'b','w','b','b','b', 30,'b','w','b','b','b','w','b','w','b','w','b','w'],
               ['w','w','w','w','w','b','w','b','w','b','w','w','w','b','w','b','w','w','w','b','w','b','w','b','w'],
               ['w','b','w','b','w','b','w','b','b','b','w','b','b','b', 31,'b','b','b','b','b','w','b','b','b','w'],
               ['w','w','w','w','w','b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'],              
              ],
              colors:{}
        }    
    }
    clicked = (cell) =>{
        //if(colors['visible'].includes(cell)) -> Get question number 'cell'
        //else if(colors['invisible'].includes(cell)) -> This question isnt available yet!
        //else -> It's already solved!
        console.log("Clicked Question No "+ cell);
    }
    componentDidMount(){
        // const that = this
        fetch('http://localhost:3012/play/colors')
        .then(resp => {
            console.log(resp)
            return resp.json()
        })
        // .then(data => console.log(JSON.stringify(data)))
        .catch(err => console.log(err))

        // .then(that.setState({colors:data}),()=>console.log("Got colors obj"))


    }
    render() {
        const numberToTile = (cell,j) => {
            switch(cell){
            case 'w' : return <div className="black tile"  key={j}><span className="placeholder">S</span></div>;
            case 'b' : return <div className="white tile"  key={j}><span className="placeholder">S</span></div>;
            default  : {
                return <div className="orange tile" onClick={() => this.clicked(cell)} key={j}><span className="placeholder">S</span></div>
                }
            }
        }
        return (
            <div className="mazeWrapper">
                {this.state.maze.map((row,i) => <div className="row" key={i}> {row.map((cell,j) => numberToTile(cell,j))} </div>)}
            </div>
        )
    }
}

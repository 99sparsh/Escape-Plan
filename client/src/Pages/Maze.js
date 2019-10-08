import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./Maze.css"

class Maze extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rank : 0,
            maze: [
                ['q1', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'q2'],
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
                ['q3', 'w', 'w', 'w', 'w', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'q4'],
            ],
            colors: {},
            data: {},
            solved: []
        }
    }
    clicked = (cell) => {
        // Not WORKING?
         
         if(this.state.colors['visible'].includes(cell)){
                this.props.fetchQues(cell)
             }
         else if(this.state.colors['invisible'].includes(cell)){
             this.props.fetchQues(0)
         } 
         else{
             this.props.fetchQues(-1)
         }
    }

    componentDidMount() {
        // const that = this
        fetch('/api/play/colors')
        .then(
            resp => {return resp.json()}
        ).then(
            data => {
                if (!data.success && String(data.msg) === "Login First!")
                    this.props.history.push("/login");
                else if (!data.success && String(data.msg) === "Unauthorized access")
                    this.props.history.push("/home");
                else {
                    this.setState({colors: data.data},
                        () => this.setState({solved: this.state.colors['solved']})
                        );
                }
            }
        ).catch(
            err => console.log(err)
        )


        fetch('/api/play/rank',{
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(
            resp => {return resp.json()}
        ).then(
            data =>{
                if (!data.success && String(data.msg) === "Login First!")
                    this.props.history.push("/login");
                else if (!data.success && String(data.msg) === "Unauthorized access")
                    this.props.history.push("/home");
                else { 
                    this.setState({ranks:data});
                }
            }
        ).catch(
            err => console.log(err)
        )

        fetch('/api/home', {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(
            resp => {
                
                return resp.json()
            }
        ).then(
            data => {
                if (!data.success && String(data.msg) === "Login First!")
                    this.props.history.push("/login");
                else if (!data.success && String(data.msg) === "Unauthorized access")
                    this.props.history.push("/home");
                else {
                    this.setState({rank:data["msg"]["score"]});
                }
            }
        ).catch(
            err => console.log(err)
        )

    }

    render() {
        const numberToTile = (cell, j) => {
            switch (cell) {
                case 'w': return <div className="black tile" key={j}><span className="placeholder">S</span></div>;
                case 'q1': return <div className="black tile rounded1" key={j}><span className="placeholder">S</span></div>;
                case 'q2': return <div className="black tile rounded2" key={j}><span className="placeholder">S</span></div>;
                case 'q3': return <div className="black tile rounded3" key={j}><span className="placeholder">S</span></div>;
                case 'q4': return <div className="black tile rounded4" key={j}><span className="placeholder">S</span></div>;
                case 'b': return <div className="white tile" key={j}><span className="placeholder">S</span></div>;
                default: {
                    /* The rest are question numbers */
                    if(this.state.solved.indexOf(cell) > -1) return <div className = "purple tile" onClick = {()=> this.clicked(cell)} key = {j}><span className = "placeholder">S</span></div>
                    return <div className="orange tile" onClick={() => this.clicked(cell)} key={j}><span className="placeholder">S</span></div>
                }
            }
        }
        return (
            <div className="Maze">
                {/* <div className="rank">
                    Score:{this.state.rank}
                </div> */}
                <div className="mazeWrapper">
                    {this.state.maze.map((row, i) => <div className="row" key={i}> {row.map((cell, j) => numberToTile(cell, j))} </div>)}
                </div>
            </div>
        )
    }
}

export default withRouter(Maze);
import React, { Component } from 'react';
import "./Navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    expand() {
        var li = document.getElementsByClassName("li");
        for (let i = 0; i < li.length; i++) {
            {
                if (li[i].style.display === "block") {
                    li[i].style.display = "none";
                } else {
                    li[i].style.display = "block";
                }
            };
        }
    }


    render() {
        return (
            <div className="Navbar">
                <ul>
                    <li className="logobar">Insert Logo</li>
                    <li className="li"><a href="/">Home</a></li>
                    <li className="li"><a href="/Play">Maze</a></li>
                    <li className="li"><a href="/Leaderboards">Leaderboard</a></li>
                    <li className="li"><a href="/Rules">Rules</a></li>
                    {/* <li><a>Logout</a></li> */}
                    <i className="material-icons"><a onClick={() => this.expand()}>menu</a></i>
                </ul>
                <br />
            </div>
        )
    }
}

export default Navbar;
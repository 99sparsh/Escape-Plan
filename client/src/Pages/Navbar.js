import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { rank: 0 };
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
      }
    }
  }

  logOut() {
    fetch("/auth/logout", {
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
    //this.props.history.push("/login");
  }

  componentDidMount() {
    fetch(`/play/rank`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(datajson => {
        console.log("NavBar:");
        console.log(datajson);
        this.setState({
          rank: datajson.data.rank
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Navbar">
        <ul>
          <li className="logobar">Insert Logo</li>
          <li className="li">{this.state.username}</li>
          <li className="li">Your Rank: {this.state.rank}</li>
          <li className="li">
            <a href="/">Home</a>
          </li>
          <li className="li">
            <a href="/Play">Maze</a>
          </li>
          <li className="li">
            <a href="/Rules">Rules</a>
          </li>
          <li>
            <a onClick={() => this.logOut()}>Logout</a>
          </li>
          <i className="material-icons">
            <a onClick={() => this.expand()}>menu</a>
          </i>
        </ul>
        <br />
      </div>
    );
  }
}

export default Navbar;

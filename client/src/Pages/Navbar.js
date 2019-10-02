import React, { Component } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import Logo from "./logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { rank: 0 };
    this.logOut = this.logOut.bind(this);
  }

  expand() {
    var li = document.getElementsByClassName("li");
    for (let i = 0; i < li.length; i++) {
      if (li[i].style.display === "block") {
        li[i].style.display = "none";
      } else {
        li[i].style.display = "block";
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
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
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
        this.setState({
          rank: datajson.data.rank
        });
      })
      .catch(err => {
        console.log(err);
      });

    fetch("/home", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.setState({ username: data.msg.username });
      });
  }

  render() {
    return (
      <div className="Navbar">
        <ul>
          <li className="logobar">
            <img src={Logo} height="60" width="50" alt="TechTatva '19 "></img>
          </li>
          <li className="li">Username: {this.state.username}</li>
          <li className="li">Rank: {this.state.rank}</li>
          <li className="li">
            <a href="/home">Home</a>
          </li>

          <li className="li">
            <a href="/rules">Rules</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
          <i className="material-icons">
            <a href="" onClick={() => this.expand()}>
              menu
            </a>
          </i>
        </ul>
        <br />
      </div>
    );
  }
}

export default withRouter(Navbar);

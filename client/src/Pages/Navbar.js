import React, { Component } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import Logo from "./logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { rank: 0, score: 0 };
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
    fetch("/api/auth/logout", {
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
        this.props.history.push("/");
      })
      .catch(err => this.setState({ alert: err }));
  }

  componentDidMount() {
    fetch(`/api/play/rank`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(datajson => {
        if (!datajson.success && String(datajson.msg) === "Login First!")
          this.props.history.push("/login");
        else if (
          !datajson.success &&
          String(datajson.msg) === "Unauthorized access"
        )
          this.props.history.push("/home");
        else {
          this.setState({
            rank: datajson.data.rank
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetch("/api/home", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (!data.success && String(data.msg) === "Login First!")
          this.props.history.push("/login");
        else if (!data.success && String(data.msg) === "Unauthorized access")
          this.props.history.push("/home");
        else {
          this.setState({ username: data.msg.username, score: data.msg.score });
        }
      });
  }

  render() {
    return (
      <div className="Navbar">
        <ul>
          <li className="logobar">
            <div className="logthingy">
              <img src={Logo} height="72" width="60" alt="TechTatva '19 "></img>
              <div className="logoname">
                <div>Escape Plan</div>
                <div>Alacrity | TechTatva '19</div>
              </div>
            </div>
          </li>

          <li className="li">Username: {this.state.username}</li>
          <li className="li">Rank: {this.state.rank}</li>
          <li className="li"> Score: {this.state.score}</li>
          <li className="li">
            <a href="/home">Home</a>
          </li>

          <li className="li">
            <a href="/rules">Rules</a>
          </li>
          <li className="li">
            <a href="/logout">Logout</a>
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

export default withRouter(Navbar);

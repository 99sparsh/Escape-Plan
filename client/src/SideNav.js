import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.loggedin = props.log;
  }

  render() {
    const textStyle = { textDecoration: "none", color: "black" };
    return this.loggedin ? (
      <div className="sideNav">
        <Link to="/" style={textStyle}>
          <div className="navItem">Play</div>
        </Link>
        <Link to="/maze" style={textStyle}>
          <div className="navItem">Maze</div>
        </Link>
        <Link to="/leaderboards" style={textStyle}>
          <div className="navItem">Leaderboards</div>
        </Link>
        <Link to="/rules" style={textStyle}>
          <div className="navItem">Rules</div>
        </Link>
        <Link to="/account" style={textStyle}>
          <div className="navItem">Account</div>
        </Link>
      </div>
    ) : (
      <div className="sideNav">
        <Link to="/login" style={textStyle}>
          <div className="navItem">Login</div>
        </Link>
        <Link to="/register" style={textStyle}>
          <div className="navItem">Register</div>
        </Link>
      </div>
    );
  }
}

export default SideNav;

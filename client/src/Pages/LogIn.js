import React, { Component } from "react";
import "../App.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mkelso78@gmail.com",
      pass1: "sanchit16",
      response: "",
      loggedin: false
    };
  }

  getQuestion() {
    fetch("/play/colors", {
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => console.log(data));
  }

  handleSubmit() {
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pass1
      })
    })
      .then(resp => {
        //console.log(resp);
        return resp.json();
      })
      .then(data => {
        console.log(data);
        if (data.data == 20) this.props.history.push("/admin");
        else this.props.history.push("/play");
        //this.getQuestion();
      });
  }

  logOut() {
    fetch("/auth/logout", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="OverAll">
        <div className="formMain">
          <div>
            Email Address: <br />
            <input
              className="inpSec"
              placeholder="Email Address"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </div>

          <div>
            Password: <br />
            <input
              className="inpSec"
              placeholder="Full Name"
              onChange={e => this.setState({ pass1: e.target.value })}
              value={this.state.pass1}
            />
          </div>
        </div>
        <div>
          <button className="butSec" onClick={() => this.handleSubmit()}>
            Submit
          </button>
          <button onClick={() => this.logOut()}>Logout</button>
        </div>
      </div>
    );
  }
}

export default LogIn;

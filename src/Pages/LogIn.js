import React, { Component } from "react";
import "./Login.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass1: "",
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
        if (data.data === 20) this.props.history.push("/admin");
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
      <div className="form">
        <div className="tab-content">
          <h2 className="h2">Login</h2>
          <div className="field-wrap">
            <input
              className="req"
              placeholder="Email Address"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </div>

          <div className="field-wrap">
            <input
              className="req"
              placeholder="Full Name"
              onChange={e => this.setState({ pass1: e.target.value })}
              value={this.state.pass1}
            />
          </div>
        </div>
          {this.state.loggedin?<button className="button button-block logout" onClick={() => this.logOut()}>Logout</button>:<button className="button button-block submit" onClick={() => this.handleSubmit()}>Submit</button>}
      </div>
    );
  }
}

export default LogIn;

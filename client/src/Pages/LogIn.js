import React, { Component } from "react";
import "./Login.css";
import PasswordMask from "react-password-mask";
import { withRouter } from "react-router-dom";
import * as EmailValidator from "email-validator";

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
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ alert: "Invalid Email" });
      return;
    }

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
        return resp.json();
      })
      .then(data => {
        if (data.success) {
          if (data.data === 20) this.props.history.push("/admin");
          else this.props.history.push("/play");
        } else {
          this.setState({ alert: data.msg });
        }
      });
  }

  componentDidMount() {
    fetch("/home", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (data["msg"]["access"] !== 0) this.props.history.push("/home");
      })
      .catch(err => {
        this.props.history.push("/login");
      });
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
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              value={this.state.email}
            />
          </div>

          <div className="field-wrap">
            {/* <input
              className="req"
              placeholder="Full Name"
              onChange={e => this.setState({ pass1: e.target.value })}
              value={this.state.pass1}
            />  */}

            <PasswordMask
              id="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.pass1}
              onChange={e => this.setState({ pass1: e.target.value })}
            />
          </div>
        </div>
        <div>{this.state.alert}</div>
        <button
          className="button button-block logout"
          onClick={() => this.props.history.push("/register")}
        >
          Register
        </button>
        <button
          className="button button-block submit"
          onClick={() => this.handleSubmit()}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withRouter(LogIn);

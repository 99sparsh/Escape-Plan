import React, { Component } from "react";
import "./Login.css";
import PasswordMask from "react-password-mask";
import { withRouter } from "react-router-dom";
import * as EmailValidator from "email-validator";
import TechTatva from "./logo.png";

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

  handleSubmit() {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ alert: "Invalid Email" });
      return;
    }

    fetch("/api/auth/login", {
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
          if (data["msg"]["access"] !== 0) this.props.history.push("/home");
        }
      })
      .catch(err => {
        this.props.history.push("/login");
      });
  }

  render() {
    return (
      <div>
        <div className="form">
          <div>
            <h2 className="h2">Escape Plan </h2>
          </div>
          <div>
            <h4 className="h3">Alacrity | TechTatva '19</h4>
          </div>

          <div className="tab-content">
            <img src={TechTatva} height="120" width="100" alt="TechTatva '19" />
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
          <div className="forgot">
            <a href="/forgot"> Forgot Password</a>
          </div>
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
      </div>
    );
  }
}

export default withRouter(LogIn);

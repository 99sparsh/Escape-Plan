import React, { Component } from "react";
import "./Login.css";
import { withRouter } from "react-router-dom";
import PasswordMask from "react-password-mask";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pass1: "",
      pass2: "",
      regno: "",
      username: "",
      phone: "",
      email: "",
      error: ""
    };
  }

  handleSubmit() {
    fetch("/auth/register", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.pass1,
        password2: this.state.pass2,
        username: this.state.username,
        phone: this.state.phone,
        regno: this.state.regno
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (data.success) this.props.history.push("/login");
        else {
          this.setState({ alert: data.msg });
        }
      })
      .catch(err => {
        this.setState({ error: err.msg });
        console.log(err);
      });
  }

  render() {
    return (
      <div className="form">
        <div>{this.state.error}</div>

        <div className="tab-content">
          <h1>Register</h1>
          <div className="field-wrap">
            <br />
            <input
              className="req"
              placeholder="Full Name"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>
          <div className="field-wrap">
            <input
              className="req"
              placeholder="Registration Number"
              onChange={e => this.setState({ regno: e.target.value })}
              value={this.state.regno}
            />
          </div>
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
              placeholder="Phone No."
              onChange={e => this.setState({ phone: e.target.value })}
              value={this.state.phone}
            />
          </div>
          <div className="field-wrap">
            {/* <input
              className="req"
              placeholder="Password"
              onChange={e => this.setState({ pass1: e.target.value })}
              value={this.state.pass1}
            /> */}
            <PasswordMask
              id="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.pass1}
              onChange={e => this.setState({ pass1: e.target.value })}
            />
          </div>
          <div className="field-wrap">
            {/* <input
              className="req"
              placeholder="Confirm Password"
              onChange={e => this.setState({ pass2: e.target.value })}
              value={this.state.pass2}
            /> */}
            <PasswordMask
              id="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.pass1}
              onChange={e => this.setState({ pass2: e.target.value })}
            />
          </div>
          <div className="field-wrap">
            <input
              className="req"
              placeholder="Username"
              onChange={e => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
          </div>
        </div>
        <div>{this.state.alert}</div>
        <button
          className="button button-block submit"
          onClick={() => this.handleSubmit()}
        >
          Register
        </button>

        <button
          className="button button-block submit"
          onClick={() => this.props.history.push("/login")}
        >
          Log In
        </button>
      </div>
    );
  }
}

export default withRouter(Register);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PasswordMask from "react-password-mask";
import "./que.css";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = { token: props.token, pass1: "", pass2: "", alert: "" };
  }

  componentDidMount() {}

  resetPass() {
    fetch(`/api/auth/resetpassword?token=${this.state.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: this.state.pass1,
        password2: this.state.pass2
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (
          !data.success &&
          (String(data.msg) === "Login First!" ||
            String(data.msg) === "Unauthorized access")
        ) {
          window.confirm("Password Reset, Log In");
          this.props.history.push("/home");
        } else {
          this.setState({ alert: data.msg });
        }
      });
  }

  render() {
    return (
      <div>
        <div className="form">
          <div className="tab-content">
            <div className="field-wrap">
              <div>Enter New Password:</div>
              <PasswordMask
                id="password1"
                name="password1"
                placeholder="Enter Password"
                value={this.state.pass1}
                onChange={e => this.setState({ pass1: e.target.value })}
              />

              <div> Confirm Password:</div>

              <PasswordMask
                id="password2"
                name="password2"
                placeholder="Enter Password"
                value={this.state.pass2}
                onChange={e => this.setState({ pass2: e.target.value })}
              />
              <div>{this.state.alert}</div>
              <button onClick={() => this.resetPass()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPass);

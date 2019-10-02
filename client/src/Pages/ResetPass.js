import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = { token: props.token, pass1: "", pass2: "", alert: "" };
  }

  componentDidMount() {
    console.log(this.state.token);
  }

  resetPass() {
    console.log("This is a test");
    fetch(`/auth/resetpassword?token=${this.state.token}`, {
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
        if (data.success) {
          this.setState({ alert: data.msg });
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.alert === "" ? (
          <div>
            <input
              className="req"
              placeholder="Password"
              onChange={e => {
                this.setState({ pass1: e.target.value });
              }}
              value={this.state.pass1}
            />
            <input
              className="req"
              placeholder="Confirm Password"
              onChange={e => {
                this.setState({ pass2: e.target.value });
              }}
              value={this.state.pass2}
            />
            <button onClick={() => this.resetPass()}>Submit</button>
          </div>
        ) : (
          <div>
            <div>{this.state.alert}</div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ResetPass);

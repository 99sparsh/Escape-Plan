import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", alert: "" };
  }

  componentDidMount() {}

  forgotPass() {
    console.log("This is a test");
    fetch("/auth/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
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
              placeholder="Email Address"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              value={this.state.email}
            />
            <button onClick={() => this.forgotPass()}>Submit</button>
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

export default withRouter(Forgot);

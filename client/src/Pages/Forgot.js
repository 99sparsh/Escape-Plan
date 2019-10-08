import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./que.css";

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", alert: "" };
  }

  componentDidMount() {}

  forgotPass() {
    fetch("/api/auth/forgotpassword", {
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
          if (window.confirm("Email Sent. Follow the Link to reset Password"))
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
              <input
                className="req"
                placeholder="Email Address"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                value={this.state.email}
              />
              <div>{this.state.alert}</div>
              <button onClick={() => this.forgotPass()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Forgot);

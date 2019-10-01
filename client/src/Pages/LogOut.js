import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LogOut extends Component {
  logOut() {
    fetch("/auth/logout", {
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.props.history.push("/home");
      })
      .catch(err => console.log(err));
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
        if (data["msg"]["access"] !== 0) {
          this.logOut();
        } else this.props.history.push("/home");
      });
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(LogOut);

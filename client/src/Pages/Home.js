import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { access: 0 }
    };
  }

  componentDidMount() {
    fetch("/api/home", {
      headers: { "Content-Type": "application/json" }
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
          this.setState({ user: data.msg }, this.accessCallback);
        }
      })
      .catch(err => this.props.history.push("/home"));
  }

  accessCallback() {
    if (this.state.user["access"] === 0) this.props.history.push("/login");
    else if (this.state.user["access"] === 20)
      this.props.history.push("/admin");
    else this.props.history.push("/play");
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(Home);

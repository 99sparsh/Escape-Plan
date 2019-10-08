import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";
import Play from "./Pages/Play";
import Admin from "./Pages/Admin";
import Rules from "./Pages/Rules";
import Home from "./Pages/Home";
import LogOut from "./Pages/LogOut";
import Forgot from "./Pages/Forgot";
import ResetPass from "./Pages/ResetPass";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { access: 0 },
      access: ""
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
        this.setState({ user: data.msg }, this.accessCallback);
      })
      .catch(err => this.setState({ alert: err }));
  }

  accessCallback() {}

  render() {
    return (
      <Router>
        <div className="Overall">
          <Switch>
            <Route path="/admin" exact component={Admin} />
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/register" exact component={Register} />
            <Route path="/play" exact component={Play} loaded={false} />
            <Route path="/rules" exact component={Rules} />
            <Route path="/logout" exact component={LogOut} />
            <Route path="/forgot" exact component={Forgot} />
            <Route
              path="/resetpassword"
              component={({ match, location }) => (
                <ResetPass token={location.search.slice(7)} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

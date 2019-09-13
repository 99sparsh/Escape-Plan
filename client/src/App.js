import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";
import Play from "./Pages/Play";
import Admin from "./Pages/Admin";
import Rules from "./Pages/Rules";

class App extends Component {
  constructor() {
    super();
    this.state = {
      maze: 0
    };
  }

  componentDidMount() {
    fetch("/", {
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log("We are inside the componentmount");
        if (data.msg) {
          this.setState({ maze: 1 });
        }
      });
  }

  render() {
    return (
      <Router>
        <div className="Overall">
          <Switch>
            <Route path="/admin" exact component={Admin} />
            <Route path="/" exact component={Play} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/register" exact component={Register} />
            <Route path="/play" exact component={Play} loaded={false} />
            <Route path="/rules" exact component={Rules} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

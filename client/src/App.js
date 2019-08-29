import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SideNav from "./SideNav";
import Account from "./Pages/Account";
import Maze from "./Pages/Maze";
import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";
import Play from "./Pages/Play";
import Admin from "./Pages/Admin";

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
          <SideNav log={this.state.maze} />
          <Switch>
            <Route path="/admin" exact component={Admin} />
            <Route path="/" exact component={LogIn} />
            <Route path="/account" exact component={Account} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/register" exact component={Register} />
            <Route path="/play" exact component={Maze} />
            <Route
              path="/play/:id"
              component={({ match }) => <Play qno={match.params.id} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

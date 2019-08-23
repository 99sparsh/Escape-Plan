import React,{Component} from 'react';
import './App.css';
import {Route,BrowserRouter as Router, Switch} from 'react-router-dom';
import SideNav from './SideNav';
import MainPage from './MainPage';
import LeaderBoards from './Pages/Leaderboards';
import Rules from './Pages/Rules';
import Account from './Pages/Account';
import Maze from './Pages/Maze';
import LogIn from './Pages/LogIn';
import Register from './Pages/Register';


class App extends Component{

  constructor(){
    super();
    this.state = {
      answers: [],
      quesNo: "2",
      currentAns: '',
      quesDet: {},
      question: 'What is the Capital of Canada?',
      corrAns: 'Ottawa',
      hints: ["It is not Toronto"],
      message: ''
    }
  }

  render(){
    return (
      <Router>
      <div className = "Overall">
        <SideNav log = {0}/>
        <Switch>
          <Route path = "/" exact component = {() => <LogIn />} />
          <Route path = "/leaderboards" exact component = {LeaderBoards} />
          <Route path = "/rules" exact component = {Rules} />
          <Route path = "/maze" exact component = {Maze} />
          <Route path = "/account" exact component = {Account} />
          <Route path = "/login" exact component = {LogIn} />
          <Route path ="/register" exact component = {Register} />
          <Route path = "/play" exact component = {MainPage} />
      </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
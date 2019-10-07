import React, { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";

class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.rules = [
      "1. There are 31 questions in total with many possible paths to reach from the start to the end. Some paths maybe longer than the others.",
      "2. You need to answer trivia questions that come on your way while playing this game to progress through the maze.",
      "3. You can access more questions as you move forward in the maze.",
      "4. Hints are provided to each question but they can only be accessed from day 2 onwards.",
      "5. Answering a question gives you 1 points and answering all the questions in a path gives you a bonus 9 points.Answering all the questions in the maze gives you bonus 5 points.",
      "6. At the end, the participant with the most number of points wins"
    ];
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="rules">
          <div className="header">Rules</div>
          <div className="rulesWrapper">
            {this.rules.map(function(element) {
              return <li className="ruleno">{element}</li>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Rules;

import React, { Component } from "react";
import "./App.css";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      qno: "",
      body: "",
      hints: [],
      answers: []
    };
    this.fetchData();
  }

  fetchData() {
    fetch("/api/play/1")
      .then(resp => {
        return resp.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log("Error!: " + err));
    // console.log(js);
  }

  handleKeydown(event) {
    if (event.key === "Enter") {
      this.handleEnter();
    }
  }

  handleEnter() {
    if (this.state.currentAns === this.state.corrAns) {
      this.setState({ message: "Correct Answer!" });
    } else {
      this.state.answers.splice(0, 0, this.state.currentAns);
      this.setState({
        answers: this.state.answers,
        currentAns: "",
        message: "Wrong Answer"
      });
    }
  }

  render() {
    return (
      <div className="mainSection">
        <div className="QuestionSection">
          <div>{this.state.question}</div>
          <div>
            <input
              type="text"
              className="inpSec"
              placeholder="Answer..."
              value={this.state.currentAns}
              onChange={event =>
                this.setState({ currentAns: event.target.value })
              }
              onKeyDown={event => this.handleKeydown(event)}
            ></input>
            <button className="butSec" onClick={() => this.handleEnter()}>
              Enter
            </button>
          </div>
        </div>

        <div className="hintsandAttempt">
          <div className="HintsSection">
            <div className="hintHeader">Hints</div>
            <div className="scrollable">
              {this.state.hints.map(function(element, i) {
                return <div>{element}</div>;
              })}
            </div>
          </div>

          <div className="AttemptSection">
            <div className="attemptHeader">Attempts</div>
            <div className="scrollable">
              {this.state.answers.map(function(element, i) {
                return <div>{element}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

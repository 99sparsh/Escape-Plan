import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Popup from "react-popup";
import Maze from "./Maze";
import Navbar from "./Navbar";

import "./que.css";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qno: 0,
      alert: "",
      data: {
        body: "What is 1+1?",
        hints: [
          {
            body: "addition"
          },
          {
            body: "please add"
          }
        ]
      },
      loaded: false,
      answer: ""
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(cell) {
    this.setState({ loaded: false });
    if (cell === 0) {
      this.setState({ alert: "Question not Available" });
      return;
    }
    if (cell === -1) {
      this.setState({ alert: "Already Solved" });
      return;
    }

    fetch(`/play/${cell}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(datajson => {
        if (!datajson.success) {
          this.setState({
            alert: "You Need to solve Previous Questions First"
          });
          return;
        }
        this.setState({
          data: datajson.data,
          loaded: true,
          qno: cell,
          alert: ""
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    fetch(`/play/rank`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(datajson => {
        this.setState(
          {
            data: datajson.data
          },
          () => {
            if (!datajson.success) {
              this.props.history.push("/login");
              this.setState({ loaded: true });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  submit() {
    fetch(`/play/submit?id=${this.state.qno}`, {
      method: "POST",
      body: JSON.stringify({
        answer: this.state.answer
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ alert: data.msg });
        if (data.msg === "Solved") {
          this.setState({ loaded: false });
          this.props.history.push("/home");
        }
      })
      .catch(err => console.log(err));

    this.setState({ answer: "" });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="master">
          <Popup />
          {this.state.loaded ? (
            <div className="que">
              <Maze fetchQues={this.updateState} />
              <div className="col2">
                <div className="question">
                  <h2>Question</h2>
                  {this.state.data.body}
                </div>
                {this.state.data.hints.length !== 0 ? (
                  <div className="hints">
                    <h2>Hints</h2>
                    {this.state.data.hints.map(function(value, i) {
                      return (
                        <div key={i}>
                          {value.body}
                          <br />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                <div className="Input answer">
                  <input
                    className="textInput"
                    type="text"
                    placeholder="Answer..."
                    value={this.state.answer}
                    onChange={event =>
                      this.setState({ answer: event.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <div>{this.state.alert}</div>
                  <button
                    className="button button-block submit submitplay"
                    onClick={() => this.submit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="que2">
              <Maze fetchQues={this.updateState} />
              {this.state.alert}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Play);

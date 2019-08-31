import React, { Component } from "react";
import Popup from 'react-popup';
import Maze from "./Maze";
import Navbar from "./Navbar";

import "./que.css";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qno: props.qno,
      data: {
        "body":"What is 1+1 aaaaaaaaaaaaaaaaa aaaaaaaaaa= aaaaaaaaaaaaaaaaa aaaaaa a aa aaaaaaaaaa aaaaaaaa",
        "hints": [{
          "body":"addition"
        },
        {
          "body":"please add"
        }]
      },
      loaded: props.loaded,
      answer: ""
    }
  }

  componentDidMount() {
    fetch(`/play/${this.state.qno}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(datajson => {
        console.log(datajson);
        this.setState({
          data: datajson.data,
          loaded: true
        });
      })
      .catch(err => console.log(err));
  }

  submit() {
    console.log(this.state.answer);
    fetch(`/play/submit`, {
      method: "POST",
      body: JSON.stringify({
        answer: this.state.answer,
        id: this.state.qno
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));

    this.setState({ answer: "" });
  }

  render() {
    return (
      <>
      <Navbar/>
      <div className="master">
        <Popup/>
        {this.state.loaded ? (
          <div className="que">
          <Maze/>
          <div className="col2">
            <div className="question">
              <h2>Question</h2>
              {this.state.data.body}
            </div>
            {this.state.data.hints.length!==0?
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
            :""}
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
              <button className="button button-block submit submitplay" onClick={() => this.submit()}>
                Submit
              </button>
            </div>
          </div>
          </div>
        ) : (
          <div className="que2">
            <Maze/>
          </div>
        )}
      </div>
      </>
    );
  }
}

export default Play;

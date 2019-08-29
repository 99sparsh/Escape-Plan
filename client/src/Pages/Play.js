import React, { Component } from "react";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qno: props.qno,
      data: {},
      loaded: false,
      answer: ""
    };
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
      <div>
        {this.state.loaded ? (
          <div>
            <div className="question">
              Question:
              {this.state.data.body}
            </div>
            <div className="hints">
              Hints:
              {this.state.data.hints.map(function(value, i) {
                return (
                  <div key={i}>
                    {value.body}
                    <br />
                  </div>
                );
              })}
            </div>

            <div>
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
              <button className="button" onClick={() => this.submit()}>
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Play;

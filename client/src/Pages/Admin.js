import React, { Component } from "react";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQues: false,
      isHint: false,
      qno: "",
      body: "",
      points: "",
      answer: "",
      qid: "",
      hint: "",
      vis: ""
    };
  }

  submitQues() {
    this.setState({ isQues: false });
    fetch(`/admin/addquestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qno: this.state.qno,
        body: this.state.body,
        answer: this.state.answer,
        points: this.state.points
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  submitHint() {
    this.setState({ isHint: false });

    fetch(`/admin/addhint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qid: this.state.qid,
        body: this.state.hint,
        visibility: this.state.vis
      })
        .then(resp => {
          return resp.json();
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    });
  }

  addQuestion() {
    return (
      <div>
        <div>Question Number:</div>
        <div>
          <input
            type="text"
            placeholder="Question Number:"
            value={this.state.qno}
            onChange={event => this.setState({ qno: event.target.value })}
          />
        </div>
        <div>Question Body:</div>
        <div>
          <input
            type="text"
            placeholder="Question Body:"
            value={this.state.body}
            onChange={event => this.setState({ body: event.target.value })}
          />
        </div>
        <div>Points:</div>
        <div>
          <input
            type="text"
            placeholder="Points:"
            value={this.state.points}
            onChange={event => this.setState({ points: event.target.value })}
          />
        </div>
        <div>Answer:</div>
        <div>
          <input
            type="text"
            placeholder="Answer:"
            value={this.state.answer}
            onChange={event => this.setState({ answer: event.target.value })}
          />
        </div>
        <div>
          <button onClick={() => this.submitQues()}>Submit</button>
        </div>
      </div>
    );
  }

  addHint() {
    return (
      <div>
        <div>Question ID:</div>
        <div>
          <input
            type="text"
            placeholder="Question ID:"
            value={this.state.qid}
            onChange={event => this.setState({ qid: event.target.value })}
          />
        </div>
        <div>Hint:</div>
        <div>
          <input
            type="text"
            placeholder="Hints"
            value={this.state.hint}
            onChange={event => this.setState({ hint: event.target.value })}
          />
        </div>
        <div>Visibility:</div>
        <div>
          <input
            type="text"
            placeholder="Visibility"
            value={this.state.vis}
            onChange={event => this.setState({ vis: event.target.value })}
          />
        </div>
        <div>
          <button onClick={() => this.submitHint()}>Submit</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {!this.state.isQues && !this.state.isHint ? (
          <div></div>
        ) : (
          <div>
            {this.state.isQues ? (
              <div>{this.addQuestion()}</div>
            ) : (
              <div>{this.addHint()}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Admin;

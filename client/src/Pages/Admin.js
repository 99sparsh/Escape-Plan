import React, { Component } from "react";
import Maze from "./Maze.js";
import "./que.css";
import Navbar from "./Navbar";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addques: false,
      addhint: false,
      qno: 0,
      body: "",
      points: "",
      answer: "",
      qid: "",
      hint: "",
      vis: 0,
      message: ""
    };
    this.getQues = this.getQues.bind(this);
  }

  submitQues() {
    this.setState({ isQues: false });
    fetch(`/api/admin/addquestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qno: this.state.qno,
        body: this.state.body,
        answer: this.state.answer.toLowerCase().replace(/\s/g, ""),
        points: this.state.points
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (!data.success && String(data.msg) === "Login First!")
          this.props.history.push("/login");
        else if (!data.success && String(data.msg) === "Unauthorized access")
          this.props.history.push("/home");
        else {
          this.setState({ message: data["msg"], addques: false });
          this.props.history.push("/admin");
          this.setState({ qno: "", body: "", answer: "", points: "" });
        }
      })
      .catch(err => console.log(err));
  }

  submitHint() {
    this.setState({ isHint: false });
    fetch(`/api/admin/addhint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qid: parseInt(this.state.qno),
        body: this.state.hint,
        visibility: parseInt(this.state.vis)
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (!data.success && String(data.msg) === "Login First!")
          this.props.history.push("/login");
        else if (!data.success && String(data.msg) === "Unauthorized access")
          this.props.history.push("/home");
        else {
          console.log(data);
          this.setState({ message: data["msg"], addques: false });
          this.props.history.push("/admin");
          this.setState({ qno: "" });
        }
      })
      .catch(err => console.log(err));
  }

  addQuestion() {
    return (
      <div>
        <div>Question Number: {this.state.qno}</div>
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
        <div>Question ID: {this.state.qno}</div>
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

  getQues(cell) {
    this.setState({ qno: cell });
  }

  componentDidMount() {
    this.setState({ qno: "" });
    fetch("/api/home", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (!data.success && String(data.msg) === "Login First!")
          this.props.history.push("/login");
        else if (!data.success && String(data.msg) === "Unauthorized access")
          this.props.history.push("/home");
        else {
          console.log(data);
          if (data["msg"]["access"] !== 20) {
            this.props.history.push("/");
          }
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="master">
        <Navbar />
        {this.state.message}

        {this.state.qno === "" ? (
          <div>
            <Maze fetchQues={this.getQues} />
          </div>
        ) : (
            <div>
              {this.state.qno}
              {!(this.state.addques || this.state.addhint) ? (
                <div>
                  <button onClick={() => this.setState({ addques: true })}>
                    Add Question
                </button>
                  <button onClick={() => this.setState({ addhint: true })}>
                    Add Hints
                </button>
                </div>
              ) : (
                  <div>
                    {this.state.addques ? (
                      <div>{this.addQuestion()}</div>
                    ) : (
                        <div>{this.addHint()}</div>
                      )}
                  </div>
                )}
            </div>
          )}
      </div>
    );
  }
}

export default Admin;

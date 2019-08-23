import React, {Component} from 'react';
import '../App.css';

class LogIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: 'mkelso78@gmail.com',
            pass1: 'sanchit16',
            response : '',
            loggedin: false   
        }
    }

    getQuestions(){
        console.log("inside getquest")
        fetch('http://localhost:3012/play/1',{
            method: 'GET',
            mode: 'cors',
            headers:{
                "Content-Type":"application/json"
            },
        }).then(
            resp => {console.log(resp)}
        ).then(
            data => console.log(data)
        ).catch(
            err => console.log(err)
        )
    }

    handleSubmit(){
        fetch('http://localhost:3012/auth/login',{
            method: 'POST',
            //credentials: 'include',
            //mode:'cors',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "email":this.state.email,
                "password":this.state.pass1,  
            })
        }).then(
            resp => {
                return resp.json()
            }
        ).then(
            data => {
                console.log(data)
                console.log("pre getques")
                this.getQuestions()
            }
        )
    }

    render(){
        return (
            <div className = "OverAll">

                <div className = "formMain">
                    
                    <div>
                        Email Address: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Email Address"
                        onChange = {(e)=>this.setState({email:e.target.value})}
                        value = {this.state.email}
                         />
                    </div>
                   
                    <div>
                        Password: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Full Name"
                        onChange = {(e)=>this.setState({pass1:e.target.value})}
                        value = {this.state.pass1}
                         />      
                    </div>
                    
                </div>
                <div>
                <button
                    className = "butSec"
                    onClick = {() => this.handleSubmit()}
                    >Submit
                </button>
                <button
                    className = "butSec"
                    onClick = {() => this.getQuestions()}
                    >Questions?
                </button>
                </div>
                </div>



        )
    }

}

export default LogIn;
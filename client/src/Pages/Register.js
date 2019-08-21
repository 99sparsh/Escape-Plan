import React, {Component} from 'react';
import '../App.css';
import { restElement } from '@babel/types';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'Michael Kelso',
            pass1: 'sanchit16',
            pass2: 'sanchit16',
            regno: '189011267',
            username: 'sahay890',
            phone: '8878789066',
            email: 'mkelso78@gmail.com'
        }
    }

    handleSubmit(){
        
        fetch('http://localhost:3012/auth/register',{
            method: 'post',
            mode: 'cors',
            headers:{
                "Content-Type":"application/json"
            },    
            body: JSON.stringify({
                "name":this.state.name,
                "email":this.state.email,
                "password":this.state.pass1,
                "password2":this.state.pass2,
                "username":this.state.username,
                "phone":this.state.phone,
                "regno":this.state.regno, 
            })
        }).then(
            resp => {return resp.json()}
        ).then(
            data => console.log(data)
        ).catch(
            err => console.log(err)
        )
    }

    render(){
        return (
            <div className = "OverAll">
                <div className = "formMain">
                    <div>
                        Full Name: 
                        <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Full Name"
                        onChange = {(e)=>this.setState({name:e.target.value})}
                        value = {this.state.name}
                         />
                    </div>
                    <div>
                        Registration No.: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Registration Number"
                        onChange = {(e)=>this.setState({regno:e.target.value})}
                        value = {this.state.regno}
                         />
                    </div>
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
                        Phone No.: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Phone No."
                        onChange = {(e)=>this.setState({phone:e.target.value})}
                        value = {this.state.phone}
                         />
                    </div>
                    <div>
                        Password: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Password"
                        onChange = {(e)=>this.setState({pass1:e.target.value})}
                        value = {this.state.pass1}
                         />
                         
                    </div>
                    <div>
                        Confirm Password: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Confirm Password"
                        onChange = {(e)=>this.setState({pass2:e.target.value})}
                        value = {this.state.pass2}
                         />
                    </div>
                    <div>
                        Username: <br/>
                        <input 
                        className = "inpSec"
                        placeholder = "Username"
                        onChange = {(e)=>this.setState({username:e.target.value})}
                        value = {this.state.username}
                         />
                    </div>
                    
                </div>
                <button
                    className = "butSec"
                    onClick = {() => this.handleSubmit()}
                    >Submit</button>
            </div>
        )
    }

}

export default Register;
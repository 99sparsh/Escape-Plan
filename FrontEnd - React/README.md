Check the following methods in Pages/LogIn.js 

`
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
    `
    
    `
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
    }`

Console Log on server side after handleSubmit() ===> {status:200, cookie:..., passport:..., session:..., msg:"Login Successful!"}
Console Log on server side after getQuestion()  ===> {status: ... , msg: "Login First!"}


import React from 'react';


class Login extends React.Component{
    constructor(props) {
        super();
        this.state = {
            title:"Log In",
            firstname: '',
            lastame: '',
            email: '',
            password: '',
            submit: "Submit"
        };
    }
    render() {
        return (
            <div className="login">
                <title>{this.title}</title>
                <h1>Welcome Back!</h1>
                <input type="text" hintText="First Name" >{this.state.firstname}</input>
                <input type="text" hintText="Last Name" >{this.state.firstname}</input>
                <input type="text" hintText="you@gmail.com" >{this.state.firstname}</input>
                <input type="password" hintText="Password" >{this.state.firstname}</input>
                <br />

                <button>{this.state.button}</button>
          </div>  
        );
    }
}
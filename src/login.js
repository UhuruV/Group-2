import React from 'react';
import InputField from './Components/inputField';
import SubmitButton from './submitButton';
import UserStore from './UserStores';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: ' ',
            password: '',
            buttonDisabled:false
        }
    }
    setInputValue(property, val) {
        val = val.Trim() //trim it to get rid of spaces
        if (val.length > 12) {
            return;  //will return false
        }
        this.setState({
            [property]: val
        });
    }
    //Reset the form so the user can retype
    resetForm(){
        this.setState({
            username: ' ',
            password: '',
            buttonDisabled:false
        })
    }
    //Called when the user logs in
    async doLogIn() {
        if (!this.state.username) {
            return; 
        }
        if (!this.state.password) {
            return;
        }
        //Ensure that the user cannot double click the submit button
        this.setState({
            buttonDisabled:true,
        })
        //Trying to access API point
        try {
          
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'applocation/json',
                    'Content-Type': 'application/json'
                },
                //Sends username and password to the API  to  check in the db if they exist then create a session
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            //Successfuly logged in
            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
            
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }
    
    
        
    render() {
        return (
            <div className="login">
                Log In
                <InputField
                    type='text'
                    placeholder='Username'
                    value={this.state.username ? this.state.username : " "}
                    onChange={ (val)=>this.setInputValue('username',val) }
                />  
                <InputField
                    type='password'
                    placeholder='Enter Password'
                    value={this.state.password ? this.state.password : " "}
                    onChange={ (val)=>this.setInputValue('password',val) }
                />
                <SubmitButton
                    text='Log In'
                    disabled={this.state.buttonDisabled}
                    onClick={ () => this.doLogIn()}
                    />
          </div>  
        );
    }
}

export default LoginForm;
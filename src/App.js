import React from 'react';
import './App.css';
import { observer } from 'mobx-react';
import UserStore from './UserStores';
import LoginForm from './login';
import SubmitButton from './submitButton';

class App extends React.Component {

  /*
  API calls
  */
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content_Type':'application'
        }
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      
    }
  }
  async doLogOut() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content_Type': 'application'
        }
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }
    catch (e) {
      console.log(e);
      
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className='app'>
          <div className='container'>
            Loading,please wait...
          </div>
        </div>
      );
    }
    else {
      if (UserStore.isLoggedIn) {
        return (
          <div className='app'>
            <div className='container'>
              Welcome {UserStore.username}
              <SubmitButton
                text={'Log Out'}
                disabled={false}
                onClick={ ()=> this.doLogOut}
                />
          </div>
          </div>
        );
      }
    }
    return (
      <div className="app">
        <div className='container'>
          <LoginForm />
        </div>
      
      </div>
    );
  }
}

export default observer(App);

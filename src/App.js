import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';


class App extends Component {
  state={
    isLoggedIn: false
  }

  handleLogin = () =>{
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  render() {
    return(
      <Router>
        <div className="App">
          <Header isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
          <Switch>
            <Route path='/' exact component={(props) => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route path='/dashboard' component={Dashboard}/>
          </Switch>
          {/* <Dashboard/> */}
        </div>
      </Router>
    );
  }
}

export default App;

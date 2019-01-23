<<<<<<< HEAD
import React, { Component } from 'react';
import './App.css';
import Layout from './components/Header component/Layout';
import SignIn from './components/Pages/SignIn';
import Aircrafts from './components/Pages/Aircrafts';
import Billing from './components/Pages/Billing';
import Flights from './components/Pages/Flights';
import Instructors from './components/Pages/Instructors';
import Landing from './components/Pages/Landing';
import Settings from './components/Pages/Settings';
import SignUp from './components/Pages/SignUp';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

=======
import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Header component/Layout";
import SignIn from "./components/Pages/SignIn";
import Aircrafts from "./components/Pages/Aircrafts";
import Billing from "./components/Pages/Billing";
import Flights from "./components/Pages/Flights";
import Instructors from "./components/Pages/Instructors";
import Landing from "./components/Pages/Landing";
import Settings from "./components/Pages/Settings";
import SignUp from "./components/Pages/SignUp";
import { Route } from "react-router-dom";
>>>>>>> c4326fc501df466dea07dabd0037fd2d908219bd
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Landing />} />
        <Route exact path="/Aircrafts" render={() => <Aircrafts />} />
        <Route exact path="/Billing" render={() => <Billing />} />
        <Route exact path="/Instructors" render={() => <Instructors />} />
        <Route exact path="/Settings" render={() => <Settings />} />
        <Route exact path="/SignIn" render={props => <SignIn {...props} />} />
        <Route exact path="/SignUp" render={props => <SignUp {...props} />} />
        <Route exact path="/Flights" render={() => <Flights />} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import css from './App.module.css'
import {createBrowserHistory} from "history";
import {Switch, Redirect, Route, Router} from "react-router-dom";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {SignIn} from "./components/SignIn/SignIn";
import {SignUp} from "./components/SignUp/SignUp";
import {CreateBoard} from "./components/CreateBoard/CreateBoard";

export const customHistory = createBrowserHistory();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("TOKEN");
        if(token) {
            this.onChangeFlag(true);
        }
    }

    onChangeFlag = (loggedIn) => {
        this.setState({loggedIn})
    };

    isEmpty = (str) => {
        return str.trim() !== '';
    };

    render() {
        return (
            <Router history={customHistory}>
                <div className={css.main}>
                    {this.state.loggedIn && <Switch>
                        <Route path='/dashboard' render={() => <Dashboard onChangeFlag={this.onChangeFlag}/>}/>
                        <Route path='/createBoard' render={() => <CreateBoard onChangeFlag={this.onChangeFlag}/>}/>
                        <Redirect to='/dashboard'/>
                    </Switch>}
                    {!this.state.loggedIn && <Switch>
                        <Route path='/signIn' render={() => <SignIn onChangeFlag={this.onChangeFlag} isEmpty={this.isEmpty}/>}/>
                        <Route path='/signUp' render={() => <SignUp onChangeFlag={this.onChangeFlag} isEmpty={this.isEmpty}/>}/>
                        <Redirect to='/signIn'/>
                    </Switch>}
                </div>
            </Router>
        );
    }
}

export default App;

import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import TopMenu from './components/TopMenu/TopMenu'
import SignIn from './containers/SignIn/SignIn'

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <TopMenu />
                <Switch>
                    <Route path="/signin" exact='false' component={SignIn}/>
                    <Route path="/home" exact render={() =><h1>Hello World! This is the main page!</h1>}/>
                    <Route render = {() => {window.location = "http://localhost:3000/home"}}/>
                </Switch>
            </div>
        </ConnectedRouter>
    );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <h1>Adit</h1>
                <Switch>
                    <Route path="/login" exact >

                    </Route>
                    <Redirect from="/" to="login" />
                </Switch>
            </div>
        </ConnectedRouter>
    );
}

export default App;

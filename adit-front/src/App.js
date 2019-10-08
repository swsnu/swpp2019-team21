import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import TopMenu from './components/TopMenu/TopMenu'

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <TopMenu />
                <Switch>
                    <Route path="/login" exact >
                    </Route>
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </ConnectedRouter>
    );
}

export default App;

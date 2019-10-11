import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import TopMenu from './components/TopMenu/TopMenu'
import SignIn from './containers/SignIn/SignIn'
import ArticleSearch from './containers/ArticleSearch/ArticleSearch'

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <TopMenu />
                <Switch>
                    <Route path="/signin" exact='false' component={SignIn}/>
                    <Route path="/home" exact component={ArticleSearch}/>
                    <Route path="/mypage" exact render={() =><h1>MyPage</h1>}/>
                    <Route component={()=>window.location = '/signin'}/>
                </Switch>
            </div>
        </ConnectedRouter>
    );
}

export default App;

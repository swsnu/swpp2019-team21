import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import TopMenu from './components/TopMenu/TopMenu'
import SignIn from './containers/SignIn/SignIn'
import ArticleSearch from './containers/Article/ArticleSearch/ArticleSearch'
import SignUp from './containers/SignUp/SignUp'
import UserInfo from './containers/UserInfo/UserInfo';
import ArticleDetail from './containers/Article/ArticleDetail/ArticleDetail'

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <TopMenu />
                <Switch>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/home" exact component={ArticleSearch}/>
                    <Route path="/home" exact render={() =><h1>Hello World! This is the main page!</h1>}/>
                    <Route path="/mypage" exact component={UserInfo}/>
                    <Route path="/article/:id" exact component={ArticleDetail}/>
                    <Route component={()=>window.location = '/signin'}/>￼￼
                </Switch>
            </div>
        </ConnectedRouter>
    );
}

export default App;

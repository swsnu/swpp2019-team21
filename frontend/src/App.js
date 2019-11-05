import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import TopMenu from './components/TopMenu/TopMenu';
import SignIn from './containers/SignIn/SignIn';
import ArticleSearch from './containers/Article/ArticleSearch/ArticleSearch';
import SignUp from './containers/SignUp/SignUp';
import UserInfo from './containers/UserInfo/UserInfo';
import Home from './containers/Home/Home';
import ArticleDetail from './containers/Article/ArticleDetail/ArticleDetail';
import ArticleEdit from './containers/Article/ArticleEdit/ArticleEdit';
import ArticleCreate from './containers/Article/ArticleCreate/ArticleCreate';
import ResetPW from './containers/UserInfo/ResetPW/ResetPW';
import BottomBox from './components/BottomBox/BottomBox';
import { ScrollToTop } from './test/utils/ScrollToTop';

function App(props) {
    return (
        <ConnectedRouter
            history={props.history}
            onUpdate={() => window.scrollTo(0, 0)}>
            <div className="App">
                <ScrollToTop />
                <TopMenu />
                <Switch>
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/home" exact component={Home} />
                    <Route
                        path="/adposts/search=:tag"
                        exact
                        component={ArticleSearch}
                    />
                    <Route path="/mypage" exact component={UserInfo} />
                    <Route
                        path="/article/create"
                        exact
                        component={ArticleCreate}
                    />
                    <Route path="/resetpw" exact component={ResetPW} />
                    <Route
                        path="/article/:id"
                        exact
                        component={ArticleDetail}
                    />
                    <Route
                        path="/article/:id/edit"
                        exact
                        component={ArticleEdit}
                    />
                    <Route component={() => (window.location = '/signin')} />
                </Switch>
                <BottomBox />
            </div>
        </ConnectedRouter>
    );
}

export default App;
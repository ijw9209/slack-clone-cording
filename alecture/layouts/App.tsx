import React from 'react';

//loadable 설정
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

//loadable 설정
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));


const App = () => {
    return (
        <Switch>   
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    );
}

export default App;

//pages
//component
//layouts


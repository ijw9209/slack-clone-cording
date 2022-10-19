import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '@pages/LogIn';
import SignUp from '@pages/SignUp';


const App = () => {
    return (
        <Switch>   
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    );
}

export default App;

//pages
//component
//layouts


import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './routes/Home';

function Router(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
export default Router;
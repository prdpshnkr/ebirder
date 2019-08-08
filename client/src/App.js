import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Hotspots from './components/Hotspots/Hotspots'


function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/hotspots" component={Hotspots} />
        </Switch>
      </Fragment>
    </BrowserRouter>

  );
}

export default App;

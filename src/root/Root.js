import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AdoptionQueue from '../AdoptionQueue/AdoptionQueue';
import Landing from '../Landing/Landing';
import Adopt from '../Adopt/Adopt';
import AdoptionSuccessful from '../AdoptionSuccessful/AdoptionSuccessful';
import WaitingPage from '../WaitingPage/WaitingPage';

const history = createBrowserHistory();

class Root extends Component {
  state = { queue: [], user: '', adopting: true };

  renderRoutes() {
    return (
      <Switch>
        <Route exact path={'/'} render={() => <Landing addUser={this.addUser} setAdopting={this.setAdopting} />} />
        <Route exact path={'/adopt'} component={Adopt} />
        <Route exact path={'/queue'} render={() => <WaitingPage user={this.state.user} />} />
        <Route exact path={'/success'} component={AdoptionSuccessful} />
      </Switch>
    );
  }

  addUser = (user) => {
    this.setState({ user });
  };

  setAdopting = (adopting) => {
    this.setState({ adopting });
  };

  render() {
    return (
      <div className='main-container'>
        <h1>Petful</h1>
        {!this.state.adopting && <AdoptionQueue user={this.state.user} setAdopting={this.setAdopting} />}
        <Router history={history}>{this.renderRoutes()}</Router>
      </div>
    );
  }
}

export default Root;

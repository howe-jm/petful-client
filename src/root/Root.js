import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AdoptionQueue from '../AdoptionQueue/AdoptionQueue';
import Landing from '../Landing/Landing';
import Adopt from '../Adopt/Adopt';
import AdoptionSuccessful from '../AdoptionSuccessful/AdoptionSuccessful';
import WaitingPage from '../WaitingPage/WaitingPage';
import Header from '../Header/Header';

const history = createBrowserHistory();

class Root extends Component {
  state = { queue: [], user: '', adopting: true, queued: false };

  renderRoutes() {
    return (
      <Switch>
        <Route exact path={'/'} render={() => <Landing addUser={this.addUser} setAdopting={this.setAdopting} />} />
        <Route exact path={'/adopt'} render={() => <Adopt setAdopting={this.setAdopting} />} />
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

  setQueued = (queued) => {
    this.setState({ queued });
  };

  render() {
    return (
      <div className='content-wrapper'>
        <div className='main-container'>
          <Header />
          <Router history={history}>{this.renderRoutes()}</Router>
          {!this.state.adopting && (
            <AdoptionQueue
              user={this.state.user}
              queued={this.state.queued}
              setQueued={this.setQueued}
              setAdopting={this.setAdopting}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Root;

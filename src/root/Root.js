import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdoptionPage from '../AdoptionPage/AdoptionPage';
import LandingPage from '../LandingPage/LandingPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import AdoptPrompt from '../AdoptPrompt/AdoptPrompt';

class Root extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/adoption' component={AdoptionPage} />
        <Route exact path='/adopt-prompt' component={AdoptPrompt} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <div className='root-main'>
        <header>
          <h1>Petful</h1>
        </header>
        <main>
          <h2>Welcome to Petful!</h2>
          {this.renderRoutes()}
        </main>
      </div>
    );
  }
}

export default Root;

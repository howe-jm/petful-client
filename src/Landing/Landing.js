import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
  state = {
    user: '',
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.setAdopting(false);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ person: this.state.user });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch('https://quiet-earth-92546.herokuapp.com/people/', requestOptions)
      .then((result) => {
        this.props.addUser(this.state.user);
        this.props.history.push({
          pathname: '/queue',
        });
      })
      .catch((error) => console.log('error', error));
  };

  render() {
    return (
      <div className='landing-container'>
        <div className='landing-form'>
          <h2>Welcome to Petful!</h2>
          <p>Please enter your name to join the queue!</p>
          <p>When your name reaches the top of the list, you will be able to select a pet to adopt.</p>

          <form onSubmit={this.handleSubmitForm}>
            <div className='name-input'>
              <label htmlFor='name' className='name-input-field'>
                Enter Your Name
              </label>
              <input
                required
                type='text'
                id='user'
                value={this.state.user}
                onChange={(e) => this.setState({ user: e.target.value })}
                placeholder='First Name'
              />
            </div>
            <div className='name-submit'>
              <button type='submit' className='name-button'>
                Find Your New Best Friend
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);

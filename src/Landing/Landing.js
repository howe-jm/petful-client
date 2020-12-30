import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

    fetch('http://localhost:8000/people/', requestOptions)
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
      <div className='home-container'>
        <div className='home-form'>
          <h2>Welcome to Petful!</h2>
          <p>Please enter your name to join the queue!</p>
          <p>When your name reaches the top of the list, you will be able to select a pet to adopt.</p>

          <form onSubmit={this.handleSubmitForm}>
            <div className='form-control'>
              <label htmlFor='name'>Name </label>
              <input
                required
                type='text'
                id='user'
                value={this.state.user}
                onChange={(e) => this.setState({ user: e.target.value })}
                placeholder='Your Name'
              />
            </div>
            <div className='HomeSubmitButton'>
              <button type='submit' className='submitBtn'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);

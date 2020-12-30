import React, { Component } from 'react';

class AdoptionSuccessful extends Component {
  handleClickReturn() {
    return (window.location.href = '/');
  }

  render() {
    return (
      <div>
        <h2>Congratulations on your adoption!</h2>
        <button onClick={this.handleClickReturn}>Return to Home</button>
      </div>
    );
  }
}

export default AdoptionSuccessful;

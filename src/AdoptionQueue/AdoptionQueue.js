import React, { Component } from 'react';
import names from '../store';
import './AdoptionQueue.css';

class AdoptionQueue extends Component {
  state = { user: this.props.user, queue: [], liveAdoption: {} };

  timer = null;

  fetchQueue = () => {
    var requestOptions = {
      method: 'GET',
    };

    fetch('https://shrouded-tundra-87420.herokuapp.com/people/all', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          queue: data,
        });
      })
      .catch((error) => console.log('error', error));
  };

  componentDidMount() {
    this.fetchQueue();
  }

  enqueueName = (person) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ person });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    return fetch('https://shrouded-tundra-87420.herokuapp.com/people/', requestOptions);
  };

  requeuePet = (type, pet) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ type, pet });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    return fetch('https://shrouded-tundra-87420.herokuapp.com/pets/return', requestOptions);
  };

  dequeueName = (type) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ type });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
    };

    fetch('https://shrouded-tundra-87420.herokuapp.com/pets', requestOptions)
      .then((res) => res.json())
      .then((res) => this.setState({ liveAdoption: res }))
      .then(() => this.fetchQueue())
      .catch((error) => console.log('error', error));
  };

  recursiveQueue = async () => {
    this.props.setQueued(true);
    const newName = names[Math.floor(Math.random() * names.length)];
    const catOrDog = newName.length % 2 === 0 ? 'cat' : 'dog';
    if (this.state.queue[0] === this.props.user) {
      this.props.setAdopting(true);
      this.setState({ queue: [], liveAdoption: {} });
      window.location.href = '/adopt';
    } else {
      this.dequeueName(catOrDog);
      this.enqueueName(newName);
      this.requeuePet(catOrDog, this.state.liveAdoption.pet);
      this.fetchQueue();
      this.timer = setTimeout(() => this.recursiveQueue(), 5000);
    }
  };

  render() {
    return (
      <div className='adoption-queue'>
        <h2>Adoption Line</h2>
        <p>Please wait for your name to reach the top of the list!</p>
        <ul className='queue-list'>
          {this.state.queue &&
            this.state.queue.map((person, i) => (
              <li className='queue-name' key={i}>
                {person}
              </li>
            ))}
        </ul>
        {this.props.user && !this.props.queued && (
          <button className='queue-button' onClick={this.recursiveQueue}>
            <div>
              <p>Welcome, {this.props.user}!</p> <p>Please click here to get in line.</p>
            </div>
          </button>
        )}
        {this.state.liveAdoption.person && (
          <h2>
            {this.state.liveAdoption.person} just adopted {this.state.liveAdoption.pet.name}!
          </h2>
        )}
      </div>
    );
  }
}

export default AdoptionQueue;

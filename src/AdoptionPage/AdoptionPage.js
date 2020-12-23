import React from 'react';

export default class LandingPage extends React.Component {
  state = {
    inputName: '',
    testCounter: 0,
    adoptedPet: {},
    adoptedPerson: 'Test',
  };

  componentDidMount() {
    setInterval(() => {
      this.matchPets();
    }, 1000);
  }

  matchPets() {
    // this.setState({ testCounter: this.state.testCounter + 1 });
    // If cat
    //Fetch the next cat.
    //Set adoptedPet state.
    //If dog
    //Fetch the next dog.
    //Set adoptedPet state.
    //Fetch the next person.
    //Set adoptedPerson state.
  }

  fetchPet(type) {
    //Pet dequeue request.
  }

  fetchPerson() {
    //Person dequeue request.
  }

  postPerson(event, name) {
    event.preventDefault();
    //Person post request.
  }

  petDisplay() {
    if (this.state.adoptedPet !== null) {
      return (
        <div>
          <img src={this.state.adoptedPet.imgURL} alt='Picture of a pet.' />
          <p>Name: {this.state.adoptedPet.name}</p>
          <p>Breed: {this.state.adoptedPet.breed}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='landing-page'>
        <div>
          <h2>Pet Adoption Page</h2>
          <h3>Test Counter: {this.state.testCounter}</h3>
          <h3>Test Name: {this.state.inputName}</h3>
          <form onSubmit={(e) => this.postPerson(e, this.state.inputName)}>
            Name: <input onChange={(e) => this.setState({ inputName: e.target.value })} value={this.state.inputName} />
            <button type='submit'>Submit</button>
          </form>
          <div>{() => this.petDisplay}</div>
          <div>{this.state.adoptedPerson}</div>
        </div>
      </div>
    );
  }
}

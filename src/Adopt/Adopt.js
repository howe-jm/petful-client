import React, { Component } from 'react';
import './Adopt.css';

class Adopt extends Component {
  state = {
    personName: '',
    pets: {
      dog: {
        name: '',
        age: '',
        imgURL: '',
        description: '',
        breed: '',
        gender: '',
        story: '',
      },
      cat: {
        name: '',
        age: '',
        imgURL: '',
        description: '',
        breed: '',
        gender: '',
        story: '',
      },
    },
  };

  fetchPets() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`https://shrouded-tundra-87420.herokuapp.com/pets`, requestOptions)
      .then((pets) => pets.json())
      .then((pets) => this.setState({ pets }));
  }

  componentDidMount() {
    this.fetchPets();
  }

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

  handleClickAdopt(event, type, pet) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ type });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://shrouded-tundra-87420.herokuapp.com/pets', requestOptions)
      .then((response) => response.text())
      .then(() => this.requeuePet(type, pet))
      .then((result) => (window.location.href = '/success'))
      .catch((error) => console.log('error', error));
  }

  petDisplay(pet) {
    let { name, imageURL, breed, story, gender, description } = pet;
    return (
      <div className='pet-card'>
        <h2>{name}</h2>
        <img src={imageURL} alt={description} />
        <p>Breed: {breed}</p>
        <p>Gender: {gender}</p>
        <p>Description: {description}</p>
        <p>Story: {story}</p>
      </div>
    );
  }

  render() {
    let { dog, cat } = this.state.pets;
    return (
      <div className='adoption-container'>
        <h2>You're up!</h2>
        <p>Please select between a dog and a cat.</p>
        <div className='pet-card-container'>
          <form className='select-dog' onSubmit={(e) => this.handleClickAdopt(e, 'dog', dog)}>
            {this.petDisplay(dog)}
            <button className='adopt-dog'>Adopt {dog.name}</button>
          </form>
          <form className='select-cat' onSubmit={(e) => this.handleClickAdopt(e, 'cat', cat)}>
            {this.petDisplay(cat)}
            <button className='adopt-cat'>Adopt {cat.name}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Adopt;

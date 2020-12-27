import React from 'react';

export default class AdoptPrompt extends React.Component {
  state = {
    personName: 'Bob',
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

  componentDidMount() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`http://localhost:8000/pets`, requestOptions)
      .then((pets) => pets.json())
      .then((pets) => this.setState({ pets }));
  }

  petJsx(pet) {
    return (
      <div className='pet-card'>
        <p>Name: {pet.name}</p>
        <img src={pet.imageURL} alt={pet.description} />
        <p>Breed: {pet.breed}</p>
        <p>Gender: {pet.gender}</p>
        <p>Story: {pet.story}</p>
      </div>
    );
  }

  handleClickAdopt(type) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ type: `${type}` });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:8000/pets', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  render() {
    console.log(this.state);
    return (
      <div className='pets-container'>
        <form className='select-dog' onSubmit={() => this.handleClickAdopt('dog')}>
          <div className='dog-card'>{this.petJsx(this.state.pets.dog)}</div>
          <button className='adopt-dog'>Adopt Dog</button>
        </form>
        <form className='select-cat' onSubmit={() => this.handleClickAdopt('cat')}>
          <div className='cat-card'>{this.petJsx(this.state.pets.cat)}</div>
          <button className='adopt-cat'>Adopt Cat</button>
        </form>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  state = { pets: { cats: {}, dogs: {} } };

  fetchQueue = () => {
    var requestOptions = {
      method: 'GET',
    };

    fetch('https://shrouded-tundra-87420.herokuapp.com/pets/allpets', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pets: {
            cats: data.cats,
            dogs: data.dogs,
          },
        });
      })
      .catch((error) => console.log('error', error));
  };

  componentDidMount() {
    this.fetchQueue();
  }

  render() {
    let { cats, dogs } = this.state.pets;
    console.log(this.state.pets.cats[0]);
    return (
      <div className='header'>
        <h1>Petful!</h1>
        <h2>Some of our pets available for adoption!</h2>
        <div className='pet-pictures'>
          <div className='img-container'>
            {this.state.pets.cats[9] !== undefined && <div className='pet-name-text'>{cats[9].name}</div>}
            {this.state.pets.cats[9] !== undefined && <img src={cats[9].imageURL} alt={cats[9].description} />}
          </div>
          <div className='img-container'>
            {this.state.pets.cats[8] !== undefined && <div className='pet-name-text'>{cats[8].name}</div>}
            {this.state.pets.cats[8] !== undefined && <img src={cats[8].imageURL} alt={cats[8].description} />}
          </div>
          <div className='img-container'>
            {this.state.pets.cats[7] !== undefined && <div className='pet-name-text'>{cats[7].name}</div>}
            {this.state.pets.cats[7] !== undefined && <img src={cats[7].imageURL} alt={cats[7].description} />}
          </div>
          <div className='img-container'>
            {this.state.pets.dogs[9] !== undefined && <div className='pet-name-text'>{dogs[9].name}</div>}
            {this.state.pets.dogs[9] !== undefined && <img src={dogs[9].imageURL} alt={dogs[9].description} />}
          </div>
          <div className='img-container'>
            {this.state.pets.dogs[8] !== undefined && <div className='pet-name-text'>{dogs[8].name}</div>}
            {this.state.pets.dogs[8] !== undefined && <img src={dogs[8].imageURL} alt={dogs[8].description} />}
          </div>
          <div className='img-container'>
            {this.state.pets.dogs[7] !== undefined && <div className='pet-name-text'>{dogs[7].name}</div>}
            {this.state.pets.dogs[7] !== undefined && <img src={dogs[7].imageURL} alt={dogs[7].description} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

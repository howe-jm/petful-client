import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionPage from '../AdoptionPage/AdoptionPage';

export default function LandingPage() {
  return (
    <div className='landing-page'>
      <div>
        <h2>Pet Adoption Instructions</h2>
        <p>Please press the link below to navigate to the Adoption Page!</p>
        <p>
          On the Adoption Page, you may enter your name and select whether you would like to adopt a dog or a cat, and
          press submit. You will be entered in to the queue to adopt a pet, and when your name reaches the top of the
          queue, you will be matched with a pet in need of a home. All adoptions are final!
        </p>
        <p>
          <Link to='/adoption'>Adoption Page</Link>
        </p>
      </div>
    </div>
  );
}

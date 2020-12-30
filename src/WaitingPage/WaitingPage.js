import React from 'react';

function WaitingPage(props) {
  return (
    <div className='queue-waiting'>
      <h2>Thanks for using Petful, {props.user}!</h2>
      <p>
        Your name has been added to the queue! When your name reaches the top of the list, it will be your turn to
        adopt! Pleae press the "Begin the Queue" button to get in line and start waiting!
      </p>
    </div>
  );
}

export default WaitingPage;

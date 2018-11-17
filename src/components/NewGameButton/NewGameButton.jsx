import React from 'react';

const NewGameButton = (props) => (
  <button 
    className="btn btn-default"
    onClick={props.newGame}
  >
    New Game
  </button>
);

export default NewGameButton;

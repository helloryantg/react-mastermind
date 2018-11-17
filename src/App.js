import React, { Component } from 'react';
import './App.css';
// Must import components used in the JSX
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  // Returns the initial state values
  getInitialState = () => {
    return {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    }
  }
  
  // Returns a new guess (a full row) with 0 or null values
  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }
  // Generates the random code that the state code will be based of to check for a winner
  genCode(size) {
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * size));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }

  
  /*--- Event Handlers ---*/
  // When the new game button is clicked, sets the initial state
  newGame = () => {
    this.setState(this.getInitialState());
  }

  // When each of the 4 colors are clicked on the ColorPicker component, sets the state.selColorIdx to that idx
  handleColorSelection = (colorIdx) => {
    this.setState({
      selColorIdx: colorIdx
    })
  }

  // When a peg is clicked, first create a copy of the current guess (row) we are working with, 
  // grab the code inside that current guess and update the code array with the index values of the pegs clicked,
  // then set the state from the guesses copy.
  handlePegClick = (pegIdx) => {
    var currentGuessIdx = this.state.guesses.length - 1;
    var guessesCopy = [...this.state.guesses];
    var codeArrCopy = [...guessesCopy[currentGuessIdx].code];
    codeArrCopy[pegIdx] = this.state.selColorIdx;
    guessesCopy[currentGuessIdx].code = codeArrCopy;
    this.setState({
      guesses: guessesCopy
    });
  }

  // 
  handleScoreClick = () => {
    // Compute the number of perfect (correct color & position)
    var currentGuessIdx = this.state.guesses.length - 1;
    var guessesCodeCopy = [...this.state.guesses[currentGuessIdx].code];
    var secretCodeCopy = [...this.state.code];
    
    var perfect = 0;
    var almost = 0;
    
    guessesCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
      }
      guessesCodeCopy[idx] = secretCodeCopy[idx] = null;
    });

    guessesCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCodeCopy[foundIdx] = null;
      }
    });

    let guessesCopy = [...this.state.guesses];

    guessesCopy[currentGuessIdx].score.perfect = perfect;
    guessesCopy[currentGuessIdx].score.almost = almost;

    if (perfect !== 4) guessesCopy.push(this.getNewGuess());

    this.setState({
      guesses: guessesCopy
    });
  }
  /*--- Lifecycle Handlers ---*/
  
  render() {
    let winTries = this.getWinTries();
    return (
      <div>
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <div className='App-game'>
          <GameBoard
            guesses={this.state.guesses}
            colors={this.state.colors}
            selColorIdx={this.state.selColorIdx}
            handlePegClick={this.handlePegClick}
            handleScoreClick={this.handleScoreClick}
          />
          <div className='App-controls'>
            <ColorPicker
              colors={this.state.colors}
              selColorIdx={this.state.selColorIdx}
              handleColorSelection={this.handleColorSelection}
            />
            <NewGameButton 
              newGame={this.newGame}
            />
          </div>
        </div>
        <footer className='App-header-footer'>
          {(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}
        </footer>
      </div>
    );
  }
}

export default App;

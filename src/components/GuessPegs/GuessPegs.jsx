import React from 'react';
import GuessPeg from '../GuessPeg/GuessPeg';
import styles from './GuessPegs.module.css';

const GuessPegs = (props) => (
  <div className={styles.pegs}>
    <GuessPeg 
      currentGuess={props.currentGuess} 
      color={props.colors[props.code[0]]}
      handlePegClick={() => props.handlePegClick(0)} 
    />
    <GuessPeg 
      currentGuess={props.currentGuess} 
      color={props.colors[props.code[1]]}
      handlePegClick={() => props.handlePegClick(1)} 
    />
    <GuessPeg 
      currentGuess={props.currentGuess} 
      color={props.colors[props.code[2]]}
      handlePegClick={() => props.handlePegClick(2)} 
    />
    <GuessPeg 
      currentGuess={props.currentGuess} 
      color={props.colors[props.code[3]]}
      handlePegClick={() => props.handlePegClick(3)} 
    />
  </div>
);

export default GuessPegs;

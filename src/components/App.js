import React, { Component } from 'react';
import axios from 'axios'

import '../style/App.css';
import '../style/Pile.css'

import Card from './Card'
import Box from './Box'

class App extends Component {
  constructor(props){
    super(props);
    this.state = { cuttedDeck: this.drawDeck()}
  }

  async getDeck(){
    const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle')
    .catch(err => console.log(err))
    return deck;
  }

  async remontDeck(){
    await axios.get('https://deckofcardsapi.com/api/deck/7kyhwcq3nxhi/shuffle/')
    .catch(err => console.log(err))
  }

  async drawDeck(){
    const cuttedDeck = await axios.get('https://deckofcardsapi.com/api/deck/7kyhwcq3nxhi/draw/?count=7')
    .catch(err => console.log(err))
    await this.remontDeck()
    return cuttedDeck
  }

  render() {  
    console.log(this.state.cuttedDeck)
    return (
      <div className="App">
        <div className="pile">
          <Box number={1}/>
          <Card link="https://deckofcardsapi.com/static/img/KH.png"/>
          <Card link="https://deckofcardsapi.com/static/img/KH.png" />
        </div>
        <div className="pile">
          <Box number={2}/>
          <Card link="https://deckofcardsapi.com/static/img/KH.png" />
        </div>
        <div className="pile">
          <Box number={3}/>
          <Card link="https://deckofcardsapi.com/static/img/KH.png" />
        </div>

      </div>
    );
  }
}

export default App;

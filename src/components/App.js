import React, { Component } from 'react';
import axios from 'axios'

import '../style/App.css';
import '../style/Pile.css'

import Card from './Card'
import Box from './Box'

class App extends Component {
  constructor(props) {
    super(props);
    this.remountPile = this.remountPile.bind(this);
    this.state = { 
      pileOne: [],
      pileTwo: [],
      pileThree: [],
      deck: [],
    }
  }

  async getDeck() {
    const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle')
      .catch(err => console.log(err))
    return deck;
  }

  async remontDeck() {
    await axios.get('https://deckofcardsapi.com/api/deck/7kyhwcq3nxhi/shuffle/')
      .catch(err => console.log(err))
  }

  async pile(){
    const cuttedDeck = await axios.get('https://deckofcardsapi.com/api/deck/7kyhwcq3nxhi/draw/?count=21')
      .catch(err => console.log(err))
    await this.remontDeck()
    const { data } = cuttedDeck
    return data.cards
  }

  async componentDidMount() {
    await this.remontDeck()
    const deck = await this.pile()
    this.setState({ deck })
    console.log(deck)
    const pileOne = deck.slice(0,7)
    const pileTwo = deck.slice(7,14)
    const pileThree = deck.slice(14,21)
    this.setState({ pileOne, pileTwo, pileThree })
  }

  remountPile(number){
    if(number === 1){ 
      console.log("FOI 1")
    }else if(number === 2){
      console.log("FOI 2")
    }else{
      console.log("FOI 3")
    }
  }

  render() {

    if (this.state.deck.length === 0 ) {
      return(
        <div> pas</div>
      )
    } else {
      return (
        <div className="App">
          <div className="pile">
            <Box number={1} remount={() => {this.remountPile(1)}}/>
            {this.state.pileOne.map((element,key) => {
              return <Card key={key} link={element.image} />
            })} 
          </div>
          <div className="pile">
            <Box number={2} remount={() => {this.remountPile(2)}}/>
            {this.state.pileTwo.map((element,key) => {
              return <Card key={key} link={element.image} />
            })}
          </div>
          <div className="pile">
            <Box number={3} remount={() =>{this.remountPile(3)}}/>
            {this.state.pileThree.map((element,key) => {
              return <Card key={key} link={element.image} />
            })}
          </div>

        </div>
      );
    }
  }
}

export default App;

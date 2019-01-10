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
      count: 0,
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
    const pileOne = deck.slice(0,7)
    const pileTwo = deck.slice(7,14)
    const pileThree = deck.slice(14,21)
    this.setState({ pileOne, pileTwo, pileThree })
  }

  dividesDeck(deck){
    let pileOne = []
    let pileTwo = []
    let pileThree = []
    let index = 1
    deck.forEach(element => {
      if(index === 1){
        pileOne.push(element)
      }else if(index === 2){  
        pileTwo.push(element)
      }else{
        pileThree.push(element)
        index = 0
      }
      index ++;
    });
    this.setState({ pileOne: pileOne, pileTwo: pileTwo, pileThree: pileThree })
  }

  remountPile(number){
    if(number === 1){ 
      const deck = this.state.pileTwo.concat(this.state.pileOne,this.state.pileTwo)
      this.setState({ deck })
      this.dividesDeck(deck)
    }else if(number === 2){
      const deck = this.state.pileOne.concat(this.state.pileTwo,this.state.pileThree)
      this.setState({ deck })
      this.dividesDeck(deck)
    }else{
      const deck = this.state.pileOne.concat(this.state.pileThree,this.state.pileTwo)
      this.setState({ deck })
      this.dividesDeck(deck)
    }
    this.setState({count: this.state.count + 1})
  }

  async restartGame(){
    await this.componentDidMount()
    this.setState({ count: 0})
  }

  render() {
    if (this.state.count === 3){
      return(
        <div className="win-screen">
          A sua carta é:
         <Card link={this.state.deck[10].image}/>
          <button className="btn primary-button" onClick={() => this.restartGame()}>
                  Play again
          </button>
        </div>
      )
    }else if (this.state.deck.length === 0 ) {
      return(
        <div></div>
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
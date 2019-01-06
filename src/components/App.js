import React, { Component } from 'react';
import axios from 'axios'

import '../style/App.css';
import '../style/Pile.css'

import Card from './Card'
import Box from './Box'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pileOne: [],
      pileTwo: [],
      pileThree: [],
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
    const cuttedDeck = await axios.get('https://deckofcardsapi.com/api/deck/7kyhwcq3nxhi/draw/?count=7')
      .catch(err => console.log(err))
    await this.remontDeck()
    const { data } = cuttedDeck
    return data.cards
  }

  async componentDidMount() {
    await this.remontDeck()
    const pileOne = await this.pile()
    const pileTwo = await this.pile()
    const pileThree = await this.pile()
    this.setState({ pileOne, pileTwo, pileThree })
    console.log(pileTwo)
    // axios.get('https://deckofcardsapi.com/api/deck/7kyhwcq3nxhi/draw/?count=7')
    //   .then(resp => {
    //     this.setState({ pileOne: resp.data.cards })
    //     console.log(this.state.pileOne)
    //   })

    

  }

  render() {

    if (this.state.pileOne.length === 0 && this.state.pileTwo.length === 0 && this.state.pileThree.length === 0 ) {
      return(
        <div> pas</div>
      )
    } else {
      return (
        <div className="App">
          <div className="pile">
            <Box number={1} />
            {this.state.pileOne.map((element,key) => {
              return <Card key={key} link={element.image} />
            })} 
          </div>
          <div className="pile">
            <Box number={2} />
            {this.state.pileTwo.map((element,key) => {
              return <Card key={key} link={element.image} />
            })}
          </div>
          <div className="pile">
            <Box number={3} />
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

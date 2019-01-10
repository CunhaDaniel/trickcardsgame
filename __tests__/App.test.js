import React from 'react'
import { shallow } from 'enzyme'

import App from '../src/components/App'
import Box from '../src/components/Box'
import Card from '../src/components/Card'

describe('Testing component box', () => {
  it('should render correctly box component', () => {
    const wrapper = shallow(
      <Box number={5} />
    )
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ number: 8 })
    expect(wrapper).toMatchSnapshot();
  })
})


describe('Testing component app', () => {
  it('should render correctly app component', () => {
    const wrapper = shallow(
      <App />
    )
    expect(wrapper).toMatchSnapshot();
  })
})

describe('Testing component card', () => {
  it('should render correctly card component', () => {
    const wrapper = shallow(
      <Card  link={"https://deckofcardsapi.com/static/img/6S.png"}/>
    )
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ link: "https://deckofcardsapi.com/static/img/8H.png" })
  })
})
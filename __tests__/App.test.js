  import React from 'react'
  import { shallow } from 'enzyme'
  import App from '../src/components/App'

  describe('Testing render for Home Screen', () =>{
    it('should render correctly',()=>{
      const wrapper = shallow(
        <App/>
      )
      expect(wrapper).toMatchSnapshot();
    })
  })
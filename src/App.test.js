// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './components/App';
import Sum from './components/sum'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

test('adds 1 + 2 to equal 3', () =>{
  expect(Sum(1,2)).toBe(3);
})

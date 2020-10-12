import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App',()=>{
  let wrapper
  beforeEach(()=>{
    wrapper = shallow(<App />);
  })
  it('renders app', () => {
    expect(wrapper.exists()).toEqual(true)
  });

  it('renders title', () => {
    const title = wrapper.find("[data-testid='title']").text()
    expect(title).toEqual('Movies Search App')
  });
})

import React from 'react';
import { shallow } from 'enzyme';
import {Movies} from './Movies';

describe('Movies',()=>{
  let wrapper

  const history = {
    location:{
      search:''
    }
  }

  beforeEach(()=>{
    wrapper = shallow(<Movies history={history}/>);
  })

  it('renders Movies',()=>{
    expect(wrapper.exists()).toEqual(true)
  })

  it('renders search component',()=>{
    const searchComponent = wrapper.find("[data-testid='search']")
    expect(searchComponent.exists()).toEqual(true)
  })

  it('should not render total results, movie card and button',()=>{
    const total = wrapper.find("[data-testid='total']")
    const movieCards = wrapper.find("[data-testid='movieCards']")
    const showMoreButton = wrapper.find("[data-testid='showMoreButton']")

    expect(movieCards.exists()).toEqual(false)
    expect(total.exists()).toEqual(false)
    expect(showMoreButton.exists()).toEqual(false)
  })
})

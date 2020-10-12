import React from 'react';
import { shallow } from 'enzyme';
import {SearchMovies} from './SearchMovies';

describe('SearchMovies',()=>{
  let wrapper

  const fetchMovies = jest.fn()
  const history = {
    location:{
      search:''
    }
  }

  const searchProps = {
    fetchMovies,
    history
  }

  beforeEach(()=>{
    wrapper = shallow(<SearchMovies {...searchProps}/>);
  })

  it('renders app', () => {
    expect(wrapper.exists()).toEqual(true)
  });

  it('renders search input',()=>{
    const searchInput = wrapper.find("[data-testid='searchInput']")
    expect(searchInput.exists()).toEqual(true)
  })
})

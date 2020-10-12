import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from './MovieCard';

describe('MovieCard',()=>{
  const mockMovie = {
    title : 'mock',
    poster_path:null,
    overview:'description',
    vote_average:5,
    release_date:'2020-12-10'
  }

  let wrapper
  beforeEach(()=>{
    wrapper = shallow(<MovieCard movie={mockMovie}/>);
  })
  it('renders app', () => {
    expect(wrapper.exists()).toEqual(true)
  });

  it('renders title,description,year',()=>{
    const movieTitle = wrapper.find("[data-testid='movieTitle']").text()
    const image = wrapper.find("[data-testid='image']")
    const description = wrapper.find("[data-testid='description']").text()
    const year = wrapper.find("[data-testid='year']").text()
    const stars = wrapper.find("[data-testid='stars']")

    expect(movieTitle).toEqual(mockMovie.title)
    expect(image.exists()).toEqual(true)
    expect(description).toEqual(mockMovie.overview)
    expect(year).toEqual(mockMovie.release_date.split('-')[0])
    expect(stars.exists()).toEqual(true)
  })

})

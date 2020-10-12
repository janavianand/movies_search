import React from 'react';
import { shallow } from 'enzyme';
import MovieDialogBox from './MovieDialogBox';

describe('MovieDialogBox',()=>{
  let wrapper

  const mockMovie = {
    title : 'mock',
    poster_path:null,
    overview:'description',
    vote_average:5,
    release_date:'2020-12-10'
  }

  const open = true
  const handleClose = jest.fn()
  const year = '2020'

  const movieDialogProps = {
    movie:mockMovie,
    open,
    handleClose,
    year
  }

  beforeEach(()=>{
    wrapper = shallow(<MovieDialogBox {...movieDialogProps}/>);
  })
  it('renders MovieDialogBox', () => {
    expect(wrapper.exists()).toEqual(true)
  });

  it('renders title,image,description,year,star', () => {
    const movieTitle = wrapper.find("[data-testid='dialogTitle']").text()
    const image = wrapper.find("[data-testid='dialogImage']")
    const description = wrapper.find("[data-testid='dialogDescription']").text()
    const year = wrapper.find("[data-testid='dialogYear']").text()
    const stars = wrapper.find("[data-testid='dialogStars']")
    const closeButton = wrapper.find("[data-testid='closeButton']")

    expect(movieTitle).toEqual(mockMovie.title)
    expect(image.exists()).toEqual(true)
    expect(description).toEqual('DESCRIPTION : '+mockMovie.overview)
    expect(year).toEqual('RELEASE YEAR : '+mockMovie.release_date.split('-')[0])
    expect(stars.exists()).toEqual(true)
    expect(closeButton.exists()).toEqual(true)
    expect(closeButton.text()).toEqual('Close')
  });
})

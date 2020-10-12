import React,{useEffect, useState} from 'react'
import {withRouter } from 'react-router-dom';
import {TextField} from '@material-ui/core';
import {  createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    searchWrapper:{
      marginBottom:'1.0575em'
    }
  })
);

export const SearchMovies = ({fetchMovies,history}) => {
  const [debounce,setDebounce] = useState(0)
  const [searchWord,setSearchWord] = useState('')

  const classes = useStyles();

  useEffect(() => {
    const queryString = history.location.search
    const searchKeywords = queryString.split('=')
    if(searchKeywords.length && searchKeywords[0] === '?qs'){
      const decodedSearchWord = decodeURI(searchKeywords[1])
      setSearchWord(decodedSearchWord)
      fetchMovies(decodedSearchWord,1,false)
    }
  }, [])

  const callDebounce = (value,page)=>{
    return setTimeout(()=>{
      fetchMovies(value,page,false)
      history.push({
        pathname:'/search/movies',
        search:`?qs=${encodeURI(value)}`
      })
    },2000)
  }

  const handleChange = (event)=>{
    clearTimeout(debounce)
    let {value} = event.target
    setSearchWord(value)
    value = value.trim()
    if(value && value.length){
      setDebounce(callDebounce(value,1))
    }
  }

  return (
    <form className={classes.searchWrapper} onSubmit={(event)=>event.preventDefault()}>
      <TextField
        id="outlined-search"
        helperText="Enter a movie name to search"
        label="movie name"
        type="search"
        variant="outlined"
        value={searchWord}
        onChange={handleChange}
        data-testid='searchInput'
        />
      </form>
  )
}

export default withRouter(SearchMovies)

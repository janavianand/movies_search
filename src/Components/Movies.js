import React,{useState} from 'react'
import { Button, LinearProgress, Typography } from '@material-ui/core';
import SearchMovies from './SearchMovies';
import MovieCard from './MovieCard'
import {getMovies} from '../Api'
import {withRouter } from 'react-router-dom';
import {  createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardWrapper:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      height: '35em',
      overflowY: 'scroll'
    },
    title:{
      fontWeight:500,
      marginBottom:'1.0575em'
    },
    buttonStyles:{
      margin:'1.0575em'
    }
  })
);


export const Movies = ({history}) => {
  const [movies,setMovies] = useState([])
  const [totalResults,setTotalResults] = useState(0)
  const [totalPages,setTotalPages] = useState(0)
  const [currPage,setCurrPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  const classes = useStyles();

  const fetchMovies = async (name,currPage,append)=>{
    setLoading(true)
    const data = await getMovies(name,currPage)
    if(data.error){
      setError(error)
    }else{
      const {total_pages,total_results,page,results} = data
      append ? setMovies([...movies,...results]) : setMovies(results)
      setTotalResults(total_results)
      setTotalPages(total_pages)
      setCurrPage(page)
    }
    setLoading(false)
  }

  const handleClick = ()=>{
    const queryString = history.location.search
    const searchKeywords = queryString.split('=')[1] || ''
    fetchMovies(decodeURI(searchKeywords),currPage+1,true)
  }

  return (
    <>
      <SearchMovies fetchMovies={fetchMovies} data-testid='search'/>
      {loading ? <LinearProgress/>:<></>}
      {totalResults ?
      <>
        <Typography component = 'p' className={classes.title} data-testid='total'>Showing {movies.length} movies of total {totalResults} {movies.length === 1 ? 'movie' : 'movies'}</Typography>
        <div className={classes.cardWrapper} data-testid='movieCards'>
          {movies && movies.length && movies.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
        </div>
        <div className={classes.buttonStyles}>
          <Button variant='outlined' onClick={handleClick} disabled={currPage === totalPages} data-testid='showMoreButton'>Show More</Button>
        </div>
      </> :
      <></>}
      {error ? <Typography component='p'>Sorry. Something went wrong. Please try later.</Typography>:<></>}
    </>
  )
}

export default withRouter(Movies)

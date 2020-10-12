import React from 'react';
import MovieCard from './Components/MovieCard';
import Movies from './Components/Movies';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {  createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    app:{
      textAlign: 'center',
      margin:'1.0575em'
    },
    appHeader:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 'calc(10px + 2vmin)',
      margin: '1.0575em'
    },
    appTitle:{
      fontWeight:600,
      fontSize:'1rem'
    }
  })
);

function App() {

  const classes = useStyles();

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <Typography component='p' className={classes.appTitle} data-testid='title'>Movies Search App</Typography>
      </header>
      <Switch>
        <Route path='/search/movies' component={Movies}/>
        <Route path='/:movieId' component={MovieCard}/>
        <Redirect path='/' to='/search/movies'/>
      </Switch>
    </div>
  );
}

export default App;

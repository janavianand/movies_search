import { Card, CardContent, CardMedia,Typography } from '@material-ui/core';
import {  createStyles, makeStyles } from '@material-ui/core/styles';
import StarRatings from 'react-star-ratings';

import React from 'react'
import MovieDialogBox from './MovieDialogBox';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      minWidth:'10.575em',
      width:'18.50625em',
      margin:'1.0575em',
      cursor:'pointer'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      width: '10.575em',
      minWidth:0,
    },
    cover: {
      minHeight:'7.93125em',
      minWidth:'5.2875em',
      display:'block',
    },
    title:{
      fontSize: '0.8rem',
      fontWeight:600,
      marginBottom:'0.52875em',
    },
    description:{
      overflow:'hidden',
      textOverflow:'ellipsis',
      whiteSpace:"nowrap",
      fontSize:'0.7rem',
      marginBottom:'1em'
    },
    textEllipsis:{
      overflow:'hidden !important',
      textOverflow:'ellipsis !important',
      whiteSpace:"nowrap !important",
      fontSize: '0.8rem',
      fontWeight:600,
      marginBottom:'0.52875em'
    },
    yearStyles:{
      textAlign:'left',
      fontWeight:600,
      fontSize:'0.7rem',
    }
  }),
);

const MovieCard = ({movie}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const {title,poster_path,overview,vote_average,release_date} = movie
  const year = release_date.split('-')[0]

  return (
    <>
      <Card className={classes.root} onClick={handleClickOpen} data-testid='movieCard'>
        <CardMedia
        className={classes.cover}
        image={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-image-icon.png'}
        title={title}
        data-testid='image'
        />
        <CardContent className={classes.content}>
          <Typography component='div' className={title.length < 30 ? classes.title : classes.textEllipsis } data-testid='movieTitle'>{title}</Typography>
          <Typography component='div' className={classes.description} data-testid='description'>{overview}</Typography>
          <Typography component='div' className={classes.yearStyles} data-testid='year'>{year}</Typography>
          <StarRatings
            rating={vote_average || 0}
            numberOfStars={10}
            starRatedColor="red"
            starEmptyColor="black"
            name="Movie Rating"
            starDimension='0.5em'
            starSpacing='0.0125em'
            data-testid='stars'
          />
        </CardContent>
      </Card>
      <MovieDialogBox open={open} handleClose={handleClose} movie={movie} year={year} data-testid='dialog'/>
    </>
  )
}

export default MovieCard

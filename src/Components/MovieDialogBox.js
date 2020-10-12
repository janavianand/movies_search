import React from 'react'
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Typography} from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import {  createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    imageWrapper:{
      textAlign:'center'
    },
    imageStyles:{
      height:'10em'
    },
    year:{
      fontWeight:600,
      fontSize:'0.8rem',
      marginBottom:'1em'
    },
    description:{
      fontSize:'0.8rem',
      marginBottom:'1em'
    }
  })
);

const MovieDialogBox = ({open,handleClose,movie,year}) => {

  const {title,poster_path,overview,vote_average} = movie

  const classes = useStyles();

  return (
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle data-testid='dialogTitle'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.imageWrapper} data-testid='dialogImage'>
              <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-image-icon.png'} className={classes.imageStyles} alt='movie poster'></img>
            </div>
          <Typography component='div' className={classes.description} data-testid='dialogDescription'>DESCRIPTION : {overview}</Typography>
          <Typography component='div' className={classes.year} data-testid='dialogYear'>RELEASE YEAR : {year}</Typography>
          <Typography component='span'>Rating : </Typography>
          <StarRatings
            rating={vote_average}
            numberOfStars={10}
            starRatedColor="red"
            starEmptyColor="black"
            name="Movie Rating"
            starDimension='0.8em'
            starSpacing='0.0125em'
            data-testid='dialogStars'
          />
          </DialogContentText>
        </DialogContent>
        <DialogActions data-testid='closeButton'>
          <Button onClick={handleClose} outline='variant'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default MovieDialogBox

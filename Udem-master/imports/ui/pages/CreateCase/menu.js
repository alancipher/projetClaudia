import React, { Component } from 'react'

import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
      align: 'center',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  });

  const general = [
    {
      url: '/../../img/medical.jpg',
      title: 'Général',
      width: '100%',
      to:'/createCase-general'
    }
  ];

  const externat1 = [
    {
      url: '/../../img/psychy.jpg',
      title: 'Psychiatie',
      width: '33.3%',
      to:'/createCase-psychiatrie'
    },
    {
      url: '/../../../img/surgery.jpg',
      title: 'Chirurgie',
      width: '33.3%',
      to:'/createCase-chirurgie'
    },
    {
      url: '/../../img/senior.jpg',
      title: 'Gériatrie',
      width: '33.3%',
      to:'/createCase-gériatrie'
    },
  ];
  
  
  

  function createMenu(props) {
    const { classes } = props;
  
    return (
      <div className={classes.root}>
      <br/><br/>
       
        <Typography color={'secondary'} align='center'  >
        <h3 align='center'> Cas clinique</h3>
        </Typography>
        
        <br/><br/>
        <div className={classes.root}>
        {general.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
            component={Link}
            to={image.to}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
        </div>
        <br/><br/><br/><br/>
       
          <Typography  align="center" color={'secondary'}  >
         <h3 align="center"> Externat </h3>
        </Typography>
       
        <br/><br/>
        <div className={classes.root}>
        {externat1.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
            component={Link}
            to={image.to}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
        
    
        </div>
      </div>
    );
  }
  
  createMenu.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(createMenu);
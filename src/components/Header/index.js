import React from 'react';
import {Link} from 'react-router-dom';  
import {Grid} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
AppBar, 
Toolbar, 
Typography, 
IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color:'white', 
      textDecoration:'none'
    }
  }));

export default function Header() {
    const classes = useStyles();
  
    return (
      
      <Grid container>
      <Grid item sm={12} xs={12}>
      <div className={classes.root}>
      
        <AppBar position="static" style={{marginBottom:'10px'}}>
          <Toolbar variant="dense">
            <Typography variant="h6" align="left" className={classes.title}>
              PORTFOLIO REPORTING
            </Typography>
            <Link to='//hstackpf.herokuapp.com/portfolio.pdf' target="_blank" className={classes.link}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <DescriptionRoundedIcon/>
                  <Typography variant="caption" align="left" className={classes.title}>
                      Portfolio Report
                  </Typography>
              </IconButton>
            </Link>
            <Link to='/' className={classes.link}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <ExitToAppIcon/>
                  <Typography variant="caption" align="left" className={classes.title}>
                      Logout
                  </Typography>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        </div>
      </Grid>
      </Grid>
      
    );
  }

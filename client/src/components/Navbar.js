import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import logo from '../assets/img/bird_logo_smallest.svg';
import group from '../assets/img/bird_logo_group.svg';
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <div className={classes.root}>
        <div className="logo-box">
          <div className="group">
            <img src={group} className="App-logo-group1" alt="logo" />
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="group">
            <img src={group} className="App-logo-group2" alt="logo" />
          </div>
          <div className="group">
            <img src={group} className="App-logo-group3" alt="logo" />
          </div>
        </div>
        <Toolbar position="static" color="inherit">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h6" className={classes.title}>

          </Typography>
          {/* <ButtonGroup variant="contained" color="primary" size="large" aria-label="Full-width contained primary button group">
              <Button><NavLink className="link" to="/" >Home</NavLink></Button>
              <Button><NavLink className="link" to="/login" >Login</NavLink></Button>
              <Button><NavLink className="link" to="/register" >Register</NavLink></Button>
            </ButtonGroup> */}
          <Button color="inherit"><NavLink className="link" to="/" >Home</NavLink></Button>
          <Button color="inherit"><NavLink className="link" to="/login" >Login</NavLink></Button>
          <Button color="inherit"><NavLink className="link" to="/register" >Register</NavLink></Button>
        </Toolbar>
      </div>
    </Grid>
  );
}




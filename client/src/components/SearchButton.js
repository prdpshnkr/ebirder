import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchTwoTone';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MyLocationTwoTone from '@material-ui/icons/MyLocationTwoTone';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    padding: '1px 8px',
    display: 'flex',
    alignItems: 'center',
    width: 750,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  button: {
    margin: 10,
  },

});

export default function SearchButton() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>

      <InputBase
        className={classes.input}
        placeholder="Search Birding Hotspots"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <MyLocationTwoTone />
      </IconButton>
      <Button size="large" variant="contained" color="primary" className={classes.button}><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/hotspots">Explore Current Location</NavLink></Button>

    </Paper>
  );
}
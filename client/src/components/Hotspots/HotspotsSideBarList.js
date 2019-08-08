import React from 'react';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    height: '86vh',
  },
  image: {
    backgroundImage: 'url(https://live.staticflickr.com/858/28966598677_9daa8a5b3c_o_d.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function HotspotsSideBarList(props) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid id="sidebar" item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Divider />
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Filter Hotspots"
              name="search"
              autoComplete="query"
              autoFocus
              value={props.query}
              onChange={(e) => { props.filterVenues(e.target.value) }}
            />
            <br />
            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell><Typography component="h3" variant="h6">List of Hotspots Nearby</Typography></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.filteredVenues && props.filteredVenues.length > 0 && props.filteredVenues.map((hotspot, index) => (
                    <TableRow><StyledTableCell key={index} className="venue-item" onClick={() => { props.listItemClick(hotspot) }} >
                      {hotspot.locName}
                    </StyledTableCell></TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

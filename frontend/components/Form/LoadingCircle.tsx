import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8),
  },
}));

const LoadingCircle: React.FC<{ display: boolean }> = ({ display }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {display ? (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default LoadingCircle;

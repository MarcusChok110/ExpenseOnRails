import {
  IconButton,
  lighten,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const ExpenseToolbar: React.FC<{ numSelected: number }> = ({ numSelected }) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={`${classes.root} ${numSelected > 0 ? classes.highlight : ''}`}
    >
      <Typography className={classes.title} variant="h6">
        Transactions
      </Typography>
      {numSelected > 0 ? (
        <>
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
          <IconButton>
            <Delete />
          </IconButton>
        </>
      ) : null}
    </Toolbar>
  );
};

export default ExpenseToolbar;

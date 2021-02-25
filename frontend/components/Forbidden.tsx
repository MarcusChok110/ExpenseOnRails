import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.error.main,
  },
}));

/**
 * Filler component when user accesses a page without being logged in
 */
const Forbidden: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text} variant="h6">
        Please log in to view this page.
      </Typography>
    </>
  );
};

export default Forbidden;

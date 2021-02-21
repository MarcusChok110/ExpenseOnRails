import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const SubmitButton: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.submit}
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;

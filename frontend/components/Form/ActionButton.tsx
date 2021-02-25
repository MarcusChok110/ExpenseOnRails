import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  primary: {
    backgroundColor: theme.palette.primary.dark + '26', //'#3c44b126'
    '& .MuiButton-label': {
      color: theme.palette.primary.dark,
    },
  },
  secondary: {
    backgroundColor: theme.palette.error.main + '26', //'#f8324526'
    '& .MuiButton-label': {
      color: theme.palette.error.main,
    },
  },
  success: {
    backgroundColor: theme.palette.success.main + '26',
    '& .MuiButton-label': {
      color: theme.palette.success.main,
    },
  },
}));

interface Props {
  color: 'primary' | 'secondary' | 'success';
  children: React.ReactNode;
  onClick?: VoidFunction;
}

/**
 * Renders a square button with primary or secondary color palette
 */
const ActionButton: React.FC<Props> = ({ color, children, onClick }) => {
  const classes = useStyles();

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ActionButton;

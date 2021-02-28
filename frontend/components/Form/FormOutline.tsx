import {
  Avatar,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  icon?: JSX.Element;
}

const FormOutline: React.FC<Props> = ({
  title,
  icon,
  handleSubmit,
  children,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        {icon && <Avatar className={classes.avatar}>{icon}</Avatar>}
        {title && <Typography variant="h5">{title}</Typography>}
        <form className={classes.form} onSubmit={handleSubmit} method="post">
          {children}
        </form>
      </Paper>
    </Container>
  );
};

export default FormOutline;

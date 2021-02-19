import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import useInput from '../components/Form/useInput';
import NextLink from 'next/link';
import { LockOpen } from '@material-ui/icons';

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
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();

  // Input Elements
  const [email, EmailInput] = useInput('Email Address', 'email');
  const [password, PasswordInput] = useInput('Password', 'password');

  // TODO: HANDLE SUBMIT TO LOG USER IN AND RETRIEVE INFO FROM DATABASE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <form className={classes.form} onSubmit={handleSubmit} method="post">
          {EmailInput}
          {PasswordInput}
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NextLink href="/register" passHref>
                <Link variant="body2">Don't have an account? Register</Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

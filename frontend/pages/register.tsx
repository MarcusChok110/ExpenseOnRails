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
import { PersonAdd } from '@material-ui/icons';
import React from 'react';
import useInput from '../components/Form/useInput';
import NextLink from 'next/link';

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

const Register: React.FC = () => {
  const classes = useStyles();

  // Input Elements
  const [firstName, FirstNameInput] = useInput('First Name', 'text', {
    required: false,
  });
  const [lastName, LastNameInput] = useInput('Last Name', 'text', {
    required: false,
  });
  const [email, EmailInput] = useInput('Email Address', 'email');
  const [password, PasswordInput] = useInput('Password', 'password');
  const [confirmPassword, ConfirmPasswordInput, setError] = useInput(
    'Confirm Password',
    'password',
    {
      helperText: 'Passwords must match',
    }
  );

  // TODO: HANDLE SUBMIT TO ADD USER TO DATABASE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError(true);
    setError(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography variant="h5">Create Account</Typography>
        <form className={classes.form} onSubmit={handleSubmit} method="post">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {FirstNameInput}
            </Grid>
            <Grid item xs={12} sm={6}>
              {LastNameInput}
            </Grid>
          </Grid>
          {EmailInput}
          {PasswordInput}
          {ConfirmPasswordInput}
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NextLink href="/login" passHref>
                <Link variant="body2">Already have an account? Log in</Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;

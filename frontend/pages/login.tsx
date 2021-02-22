import { Grid, Link } from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';
import NextLink from 'next/link';
import React from 'react';
import FormOutline from '../components/Form/FormOutline';
import SubmitButton from '../components/Form/SubmitButton';
import useInput from '../components/Form/useInput';

const Login: React.FC = () => {
  // Input Elements
  const [email, EmailInput] = useInput('Email Address', 'email');
  const [password, PasswordInput] = useInput('Password', 'password');

  // TODO: HANDLE SUBMIT TO LOG USER IN AND RETRIEVE INFO FROM DATABASE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormOutline title="Log In" icon={<LockOpen />} handleSubmit={handleSubmit}>
      {EmailInput}
      {PasswordInput}
      <SubmitButton>Sign In</SubmitButton>
      <Grid container justify="flex-end">
        <Grid item>
          <NextLink href="/register" passHref>
            <Link variant="body2">Don't have an account? Register</Link>
          </NextLink>
        </Grid>
      </Grid>
    </FormOutline>
  );
};

export default Login;

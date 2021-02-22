import { Grid, Link } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import NextLink from 'next/link';
import React from 'react';
import FormOutline from '../components/Form/FormOutline';
import SubmitButton from '../components/Form/SubmitButton';
import useInput from '../components/Form/useInput';

const Register: React.FC = () => {
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
    <FormOutline
      title="Create Account"
      icon={<PersonAdd />}
      handleSubmit={handleSubmit}
    >
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
      <SubmitButton>Sign Up</SubmitButton>
      <Grid container justify="flex-end">
        <Grid item>
          <NextLink href="/login" passHref>
            <Link variant="body2">Already have an account? Log in</Link>
          </NextLink>
        </Grid>
      </Grid>
    </FormOutline>
  );
};

export default Register;

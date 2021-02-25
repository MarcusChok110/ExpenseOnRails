import { Grid, Link } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';
import FormOutline from '../../components/Form/FormOutline';
import LoadingCircle from '../../components/Form/LoadingCircle';
import SubmitButton from '../../components/Form/SubmitButton';
import useInput from '../../components/Form/useInput';
import useLoading from '../../components/useLoading';
import useSnackbar from '../../components/useSnackbar';
import { AUTH_ROUTES } from '../../utils/constants';
import fetchOptions from '../../utils/fetchOptions';

const Register: React.FC = () => {
  const router = useRouter();

  // Input Elements
  const [firstName, firstNameProps, FirstNameInput] = useInput(
    'First Name',
    'text'
  );
  const [lastName, lastNameProps, LastNameInput] = useInput(
    'Last Name',
    'text'
  );
  const [email, emailProps, EmailInput] = useInput('Email Address', 'email');
  const [password, passwordProps, PasswordInput] = useInput(
    'Password',
    'password'
  );
  const [confirmPass, confirmPassProps, ConfirmPassInput, setError] = useInput(
    'Confirm Password',
    'password'
  );

  // Snackbars for register results
  const loginRedirect = {
    label: 'Login',
    onClick: () => {
      router.push('/login');
    },
  };
  const [openRegistered, registeredProps, RegisteredSnackbar] = useSnackbar(
    'An account with that email already exists',
    loginRedirect
  );
  const [openSuccess, successProps, SuccessSnackbar] = useSnackbar(
    'Successfully created account',
    loginRedirect
  );

  // Submit handler for form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPass) return setError(true);
    setError(false);

    const user = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const response = await fetch(
        AUTH_ROUTES.REGISTER,
        fetchOptions.createAuthPost(user)
      );
      const json = await response.json();

      if (json.success) {
        openSuccess();
      } else {
        if (json.message == 'An account with that email already exists') {
          openRegistered();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, doSubmit] = useLoading(handleSubmit);

  return (
    <>
      <FormOutline
        title="Create Account"
        icon={<PersonAdd />}
        handleSubmit={doSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FirstNameInput {...firstNameProps} disabled={loading} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LastNameInput {...lastNameProps} disabled={loading} />
          </Grid>
        </Grid>
        <EmailInput {...emailProps} required disabled={loading} />
        <PasswordInput {...passwordProps} required disabled={loading} />
        <ConfirmPassInput
          {...confirmPassProps}
          required
          disabled={loading}
          helperText="Passwords must match"
        />
        <SubmitButton disabled={loading}>Sign Up</SubmitButton>
        <Grid container justify="flex-end">
          <Grid item>
            <NextLink href="/login" passHref>
              <Link variant="body2">Already have an account? Log in</Link>
            </NextLink>
          </Grid>
        </Grid>
      </FormOutline>
      <RegisteredSnackbar {...registeredProps} />
      <SuccessSnackbar {...successProps} />
      <LoadingCircle display={loading} />
    </>
  );
};

export default Register;

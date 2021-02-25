import { Grid, Link } from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React, { useState } from 'react';
import FormOutline from '../../components/Form/FormOutline';
import LoadingCircle from '../../components/Form/LoadingCircle';
import SubmitButton from '../../components/Form/SubmitButton';
import useInput from '../../components/Form/useInput';
import useLoading from '../../components/useLoading';
import useSnackbar from '../../components/useSnackbar';
import { userActions } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/store';
import { AUTH_ROUTES } from '../../utils/constants';
import fetchOptions from '../../utils/fetchOptions';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState<boolean>(false); // to disable form components on login

  // Input Elements
  const [email, emailProps, EmailInput] = useInput('Email Address', 'email');
  const [password, passwordProps, PasswordInput] = useInput(
    'Password',
    'password'
  );

  const [openWrongEmail, wrongEmailProps, WrongEmailSnackbar] = useSnackbar(
    'Email not found'
  );
  const [
    openWrongPassword,
    wrongPasswordProps,
    WrongPasswordSnackbar,
  ] = useSnackbar('Incorrect password');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await fetch(
        AUTH_ROUTES.LOGIN,
        fetchOptions.createAuthPost(user)
      );
      const json = await response.json();

      if (json.success) {
        setDisabled(true);

        localStorage.setItem('jwt', json.token);
        dispatch(userActions.fetchUserByJWT(json.token));
        router.push('/');
      } else {
        if (json.message === 'Incorrect Email') openWrongEmail();
        if (json.message === 'Incorrect Password') openWrongPassword();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, doSubmit] = useLoading(handleSubmit);

  return (
    <>
      <FormOutline title="Log In" icon={<LockOpen />} handleSubmit={doSubmit}>
        <EmailInput {...emailProps} required disabled={loading || disabled} />
        <PasswordInput
          {...passwordProps}
          required
          disabled={loading || disabled}
        />
        <SubmitButton disabled={loading || disabled}>Sign In</SubmitButton>
        <Grid container justify="flex-end">
          <Grid item>
            <NextLink href="/register" passHref>
              <Link variant="body2">Don't have an account? Register</Link>
            </NextLink>
          </Grid>
        </Grid>
      </FormOutline>
      <WrongEmailSnackbar {...wrongEmailProps} />
      <WrongPasswordSnackbar {...wrongPasswordProps} />
      <LoadingCircle display={loading || disabled} />
    </>
  );
};

export default Login;

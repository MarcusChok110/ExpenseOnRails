import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Forbidden from '../../components/Forbidden';
import ActionButton from '../../components/Form/ActionButton';
import LoadingCircle from '../../components/Form/LoadingCircle';
import useLoading from '../../components/useLoading';
import useSnackbar from '../../components/useSnackbar';
import { selectUser, userActions } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
  input: {
    marginRight: theme.spacing(8),
  },
  toolbar: {
    margin: theme.spacing(2),
  },
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState(user.firstName ?? '');
  const [lastName, setLastName] = useState(user.lastName ?? '');
  const [email, setEmail] = useState(user.email);
  const [firstEditMode, setFirstEditMode] = useState(false);
  const [lastEditMode, setLastEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const unionEditMode = firstEditMode || lastEditMode || emailEditMode;

  useEffect(() => {
    handleReset();
  }, [user]);

  const [openSuccess, successProps, SuccessSnackbar] = useSnackbar(
    'Successfully updated settings'
  );

  // Submit handler for form
  const handleSave = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;

    try {
      dispatch(
        userActions.saveUserChanges({
          jwt,
          _id: user._id,
          state: { ...user, firstName, lastName, email },
        })
      ).then(() => {
        openSuccess();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFirstName(user.firstName ?? '');
    setLastName(user.lastName ?? '');
    setEmail(user.email);
  };

  const [loading, doSave] = useLoading(handleSave);

  const fields = [
    {
      name: 'First Name',
      state: firstName,
      setState: setFirstName,
      editMode: firstEditMode,
      setEditMode: setFirstEditMode,
      stateName: 'firstName' as 'firstName',
    },
    {
      name: 'Last Name',
      state: lastName,
      setState: setLastName,
      editMode: lastEditMode,
      setEditMode: setLastEditMode,
      stateName: 'lastName' as 'lastName',
    },
    {
      name: 'Email',
      state: email,
      setState: setEmail,
      editMode: emailEditMode,
      setEditMode: setEmailEditMode,
      stateName: 'email' as 'email',
    },
  ];

  return (
    <>
      <Typography variant="h2">Profile</Typography>
      <div className={classes.toolbar}></div>
      {user.loggedIn ? (
        <>
          <Paper elevation={3}>
            <List>
              {fields.map((value, index) => {
                return (
                  <div key={index}>
                    <ListItem>
                      {value.editMode ? (
                        <>
                          <TextField
                            label={value.name}
                            variant="outlined"
                            value={value.state}
                            onChange={(e) => value.setState(e.target.value)}
                            fullWidth
                            className={classes.input}
                          />
                          <ActionButton
                            onClick={() => value.setEditMode(false)}
                            color="success"
                          >
                            <CheckOutlined />
                          </ActionButton>
                          <ActionButton
                            onClick={() => {
                              value.setState(user[value.stateName] ?? '');
                              value.setEditMode(false);
                            }}
                            color="secondary"
                          >
                            <CloseOutlined />
                          </ActionButton>
                        </>
                      ) : (
                        <>
                          <ListItemText
                            primary={value.name}
                            secondary={`${value.state ? value.state : 'N/A'}`}
                          />
                          <ListItemIcon>
                            <ActionButton
                              onClick={() => value.setEditMode(true)}
                              color="primary"
                            >
                              <EditOutlined />
                            </ActionButton>
                          </ListItemIcon>
                        </>
                      )}
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
            <Grid container justify="space-around" spacing={4}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={doSave}
                  disabled={loading || unionEditMode}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <SuccessSnackbar {...successProps} />
          <LoadingCircle display={loading} />
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default Profile;

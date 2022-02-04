import {
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { StoreContext } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=shipping then it will redirect to shipping page

  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;
  useEffect(() => {
    // due to useeffect we check if userInfo is null or not only one time at the time of loading this component
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const classes = useStyles();

  //here e is an event object
  const submitHandler = async ({ email, password }) => {
    //below preventing the userpage from reloading/ refereshing
    closeSnackbar();
    try {
      //sending ajax request to the server
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            {/* here Controller is from react-hook-form which is like a wrapper*/}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Please enter a valid email'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password must be at least 6 characters'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link> Register </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

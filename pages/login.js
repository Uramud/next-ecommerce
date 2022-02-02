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

export default function Login() {
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

  //for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  //here e is an event object
  const submitHandler = async (e) => {
    //below preventing the userpage from reloading/ refereshing
    e.preventDefault();
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
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            {/* here e.target.value is for getting the value of the input field */}
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?
            <NextLink href="/register" passHref>
              <Link> Register </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

//This is a Header Section

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
} from '@material-ui/core';
import Head from 'next/head';
import React, { useContext } from 'react';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { StoreContext } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(StoreContext);
  const { darkMode } = state;
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        marginBottom: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        marginBottom: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({
      type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
    });

    const newDarkMode = !darkMode;
    // In Cookies it accpet 2 parameters name and value
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF', { expires: 365 });
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Ecommerce` : 'Next Ecommerce'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>E_COMMERCE</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>

        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>
            All rights reserved, Next Ecommerce. &copy;{' '}
            {new Date().getFullYear()}
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}

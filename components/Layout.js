//This is a Header Section

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import useStyles from '../Utils/styles';

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Next Ecommerce</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>Ecommerce</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>
          All rights reserved, Next Ecommerce. &copy; {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  );
}

//This is a Header Section

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Next Ecommerce</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>Ecommerce</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>
          All rights reserved, Next Ecommerce. &copy; {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  );
}

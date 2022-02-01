import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import NextLink from 'next/link';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import Product from '../../models/Product';
import db from '../../utils/db';
import { StoreContext } from '../../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const { product } = props;
  const classes = useStyles();

  //below we fetched product from data.js and we are filtering it by slug

  if (!product) {
    return <div>Product not found</div>;
  }
  //add to cart function
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);

    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (data.countInStock < quantity) {
      window.alert(`${data.countInStock} Product are in stock!`);
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    //sending to cartScreen page
    router.push('/cart');
  };
  // above ...product is an object
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <Button>
          <NextLink href="/" passHref>
            <Link>
              <Typography>Back to product</Typography>
            </Link>
          </NextLink>
        </Button>
      </div>
      {/* parent grid */}
      <Grid container spacing={1}>
        {/* child grid */}
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={440}
            height={440}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography component="h1" variant="h1">
            {product.name}
          </Typography>
          <List>
            <ListItem>
              <Typography>Category : {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand : {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating : {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description : {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  //here lean() to seralize the data and which is important else server error occurs
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

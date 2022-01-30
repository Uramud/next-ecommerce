import React from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
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

export default function ProductScreen(props) {
  const { product } = props;
  const classes = useStyles();

  //below we fetched product from data.js and we are filtering it by slug

  if (!product) {
    return <div>Product not found</div>;
  }
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
                <NextLink href={`/order`} passHref>
                  <Link>
                    <Button fullwidth variant="contained" color="secondary">
                      Add to cart
                    </Button>
                  </Link>
                </NextLink>
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

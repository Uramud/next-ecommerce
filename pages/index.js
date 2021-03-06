// import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import Layout from '../components/layout';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { StoreContext } from '../utils/Store';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  //so the products comming from getServerSideProps function
  // will pass to home components through props const { products } = props;
  //and render all products inside the home page
  const { products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
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
  return (
    <Layout>
      <div>
        <h1>Products</h1>

        {/* parent grid */}
        <Grid container spacing={3}>
          {/* child grid */}
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                      width={450}
                      height={450}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

// by having below function before rendering home page in the server side,
//  we fetch data from database and pass it to home page component
export async function getServerSideProps() {
  await db.connect();
  //here lean() to seralize the data and which is important else server error occurs
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

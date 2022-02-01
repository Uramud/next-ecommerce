import {
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TableCell,
  TableContainer,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Card,
  ListItem,
  List,
} from '@material-ui/core';
import React, { useContext } from 'react';
import Layout from '../components/layout';
import { StoreContext } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { disconnect } from 'mongoose';
import axios from 'axios';
import { useRouter } from 'next/router';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Product is out of stock !!!');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkOutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="My Cart">
      <Typography compnent="h1" variant="h1">
        My Shopping List
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty!!!{' '}
          <NextLink href="/" passHref>
            <Link> Go Shopping </Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={8} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align="right">${item.price}</TableCell>

                      <TableCell align="right">
                        <Button
                          variant="conatined"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid md={4} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Sub-Total ( {cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items ) : <br /> ${' '}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkOutHandler}
                    variant="container"
                    color="secondary"
                    fullWidth
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
//here ssr is server side rendering for that set es6 to true in eslintrc.json
//so ssr is false
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
//here at the beginning of sunction export is removed and then we are adding dynamic and exporting function( CartScreen ) using dynamic.
//it is done to avoid badge problem  here it hepls to render the page only in client side.

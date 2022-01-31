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

export default function CartScreen() {
  const { state } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;
  return (
    <Layout title="My Cart">
      <Typography compnent="h1" variant="h1">
        My Shopping List
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty!!!
          <NextLink href="/">Go Shopping</NextLink>
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
                        <Select value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align="right">${item.price}</TableCell>

                      <TableCell align="right">
                        <Button variant="conatined" color="secondary">
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
                  <Button variant="container" color="secondary" fullWidth>
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

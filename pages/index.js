// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import Layout from '../components/layout';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>

        {/* parent grid */}
        <Grid container spacing={3}>
          {/* child grid */}
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                </CardActionArea>
                <CardContent>
                  <Typography>{product.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

//this are the seed data for the database

import nc from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  //connecting to database
  await db.connect();

  //before seeding the Product model we delete all record from the product model
  await Product.deleteMany();
  //insert many accpet an array of objects or documents
  await Product.insertMany(data.products);
  //disconnecting from database
  await db.disconnect();

  //sending products from database
  res.send({ message: 'sedded successfully' });
});

export default handler;

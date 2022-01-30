import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  //connecting to database
  await db.connect();

  //finding all products from database
  const products = await Product.find({});

  //disconnecting from database
  await db.disconnect();

  //sending products from database
  res.send(products);
});

export default handler;

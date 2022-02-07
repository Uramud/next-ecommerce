import nc from 'next-connect';
import Order from '../../../models/Product';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({ onError });
handler.use(isAuth);

handler.post(async (req, res) => {
  //connecting to database
  await db.connect();

  //finding all orders from database
  const newOrders = new Order({
    ...req.body,
  });

  //saving order to database
  const order = await newOrders.save();

  //sending products from database
  res.status(201).send(order);
});

export default handler;
